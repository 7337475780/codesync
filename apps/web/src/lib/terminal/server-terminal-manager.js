"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.terminalManager = void 0;
var os_1 = require("os");
var fs_1 = require("fs");
var path_1 = require("path");
var ServerTerminalManager = /** @class */ (function () {
    function ServerTerminalManager() {
        this.terminals = new Map();
    }
    ServerTerminalManager.prototype.getDefaultShell = function () {
        if (os_1.default.platform() === "win32") {
            return process.env.ComSpec || "C:\\Windows\\System32\\cmd.exe";
        }
        return process.env.SHELL || "/bin/bash";
    };
    ServerTerminalManager.prototype.createTerminal = function (id, cwd, cols, rows) {
        var _this = this;
        if (cwd === void 0) { cwd = process.cwd(); }
        if (cols === void 0) { cols = 80; }
        if (rows === void 0) { rows = 24; }
        if (this.terminals.has(id)) {
            this.killTerminal(id);
        }
        var workingDir = path_1.default.resolve(cwd);
        if (!fs_1.default.existsSync(workingDir)) {
            try {
                fs_1.default.mkdirSync(workingDir, { recursive: true });
            }
            catch (e) {
                console.error("Failed to create working directory:", e);
            }
        }
        if (!fs_1.default.existsSync(workingDir)) {
            throw new Error("Working directory does not exist: ".concat(workingDir));
        }
        var shell = this.getDefaultShell();
        var args = shell.includes('powershell') ? ['-NoLogo'] : [];
        var pty;
        try {
            pty = require('node-pty');
        }
        catch (e) {
            console.warn('node-pty not available, using mock fallback', e);
            pty = {
                spawn: function () { return ({
                    onData: function (cb) {
                        setTimeout(function () { return cb('\x1b[31mTerminal unavailable: node-pty native module not built.\x1b[0m\r\n'); }, 100);
                    },
                    onExit: function (cb) { },
                    write: function () { },
                    resize: function () { },
                    kill: function () { },
                }); }
            };
        }
        var spawnEnv = process.env;
        console.log({
            shell: shell,
            cwd: workingDir,
            exists: fs_1.default.existsSync(workingDir),
            cols: cols,
            rows: rows,
        });
        var ptyProcess;
        try {
            ptyProcess = pty.spawn(shell, args, {
                name: 'xterm-256color',
                cols: cols || 80,
                rows: rows || 24,
                cwd: workingDir,
                env: spawnEnv,
                useConpty: true
            });
        }
        catch (err) {
            console.error("PTY Spawn Failed", {
                shell: shell,
                cwd: workingDir,
                exists: fs_1.default.existsSync(workingDir),
                error: err,
            });
            throw err;
        }
        var session = {
            ptyProcess: ptyProcess,
            outputBuffer: '',
            cwd: workingDir,
            command: shell,
            args: []
        };
        ptyProcess.onData(function (data) {
            session.outputBuffer += data;
        });
        ptyProcess.onExit(function () {
            _this.terminals.delete(id);
        });
        this.terminals.set(id, session);
    };
    ServerTerminalManager.prototype.writeToTerminal = function (id, data) {
        var session = this.terminals.get(id);
        if (session) {
            session.ptyProcess.write(data);
        }
        else {
            throw new Error("Terminal ".concat(id, " not found"));
        }
    };
    ServerTerminalManager.prototype.readTerminalOutput = function (id) {
        var session = this.terminals.get(id);
        if (session) {
            var output = session.outputBuffer;
            session.outputBuffer = ''; // Clear buffer after reading
            return output;
        }
        throw new Error("Terminal ".concat(id, " not found"));
    };
    ServerTerminalManager.prototype.resizeTerminal = function (id, cols, rows) {
        var session = this.terminals.get(id);
        if (session) {
            session.ptyProcess.resize(cols, rows);
        }
        else {
            throw new Error("Terminal ".concat(id, " not found"));
        }
    };
    ServerTerminalManager.prototype.killTerminal = function (id) {
        var session = this.terminals.get(id);
        if (session) {
            session.ptyProcess.kill();
            this.terminals.delete(id);
        }
    };
    ServerTerminalManager.prototype.hasTerminal = function (id) {
        return this.terminals.has(id);
    };
    return ServerTerminalManager;
}());
// Global instance to persist across API requests during development
var globalForTerminal = global;
exports.terminalManager = globalForTerminal.terminalManager || new ServerTerminalManager();
if (process.env.NODE_ENV !== 'production') {
    globalForTerminal.terminalManager = exports.terminalManager;
}
