const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src'));
let updated = 0;

for (const file of files) {
  if (file.includes('supabase/server.ts') || file.includes('supabase/client.ts') || file.includes('auth/client.ts') || file.includes('auth/server.ts')) {
    continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('const supabase = createClient();') || content.includes('const supabase = await createClient()')) {
    // Only replace synchronous ones
    if (content.includes('const supabase = createClient();')) {
       content = content.replace(/const supabase = createClient\(\);/g, 'const supabase = await createClient();');
       fs.writeFileSync(file, content);
       console.log('Updated: ' + file);
       updated++;
    }
  }
}
console.log('Total files updated: ' + updated);
