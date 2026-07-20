const pty = require('node-pty');
const fs = require('fs');
const path = require('path');

const shell = process.env.ComSpec || "C:\\Windows\\System32\\cmd.exe";
const workingDir = path.resolve(process.cwd());

console.log("Testing node-pty with:");
console.log("Shell:", shell);
console.log("CWD:", workingDir);
console.log("CWD exists?", fs.existsSync(workingDir));

try {
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 24,
    cwd: workingDir,
    env: process.env,
    useConpty: true
  });
  console.log("SUCCESS!");
  ptyProcess.kill();
} catch (e) {
  console.error("FAILED with error:");
  console.error(e);
}
