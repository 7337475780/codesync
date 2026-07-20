const os = require('os');
const fs = require('fs');
const path = require('path');

const shell = os.platform() === 'win32' ? process.env.ComSpec || "C:\\Windows\\System32\\cmd.exe" : process.env.SHELL || "/bin/bash";
const cwd = 'c:/test_dir_not_exist_999';
let workingDir = path.resolve(cwd);

if (!fs.existsSync(workingDir)) {
  try {
    fs.mkdirSync(workingDir, { recursive: true });
  } catch (e) {
    console.error("Failed to create working directory:", e);
  }
}

console.log({
  shell,
  cwd: workingDir,
  exists: fs.existsSync(workingDir),
});
