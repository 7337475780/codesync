const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/terminal/create',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Try to find the Next.js error message in the HTML
    const match = data.match(/<title>(.*?)<\/title>/);
    if (match) {
      console.log('Error Title:', match[1]);
    }
    
    // Look for next.js error data
    const scriptMatch = data.match(/<script data-next-page="([^"]+)".*?>([^<]+)<\/script>/);
    const textMatch = data.match(/data-nextjs-dialog-header.*?>(.*?)</);
    if (textMatch) console.log('Header:', textMatch[1]);
    
    // Just print lines containing 'Error' or 'error'
    const lines = data.split('\n');
    lines.forEach(l => {
      if (l.includes('Error:')) {
        console.log('Found line:', l.substring(0, 300));
      }
    });

    // Write full response to file for debugging
    require('fs').writeFileSync('error.html', data);
    console.log('Saved full HTML to error.html');
  });
});

req.on('error', e => console.error(e));
req.write(JSON.stringify({ cols: 80, rows: 24, projectId: 'test' }));
req.end();
