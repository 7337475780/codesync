const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('apps/web/src/app/api/git', function(filePath) {
  if (filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('const git = getGitClient(') && !content.includes('await getGitClient(')) {
      content = content.replace(/const git = getGitClient\(/g, 'const git = await getGitClient(');
      fs.writeFileSync(filePath, content);
      console.log('Updated', filePath);
    }
  }
});
