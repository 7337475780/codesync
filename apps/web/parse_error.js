const fs = require('fs');
const html = fs.readFileSync('error.html', 'utf8');

const titleMatch = html.match(/<title>(.*?)<\/title>/);
if (titleMatch) console.log('TITLE:', titleMatch[1]);

// Try to find raw error stack or message in JSON data inside script tags
const scriptMatches = html.match(/<script.*?>(.*?)<\/script>/g);
if (scriptMatches) {
  scriptMatches.forEach(script => {
    if (script.includes('Error:')) {
      const idx = script.indexOf('Error:');
      console.log('FOUND IN SCRIPT:', script.substring(idx, idx + 500));
    }
  });
}

// Just match any text containing Error:
const textMatches = html.match(/[^>]*Error:[^<]*/g);
if (textMatches) {
  textMatches.forEach(t => {
    if (t.trim().length > 10) console.log('TEXT:', t.trim());
  });
}
