"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_terminal_manager_1 = require("./apps/web/src/lib/terminal/server-terminal-manager");
try {
    server_terminal_manager_1.terminalManager.createTerminal('test-id', 'c:/test_dir_not_exist_999');
}
catch (e) {
    console.error("Caught error:", e);
}
