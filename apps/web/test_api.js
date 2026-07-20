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
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', res.headers);
    console.log('BODY:', data.substring(0, 1000));
  });
});

req.on('error', e => console.error(e));
req.write(JSON.stringify({ cols: 80, rows: 24, projectId: 'test' }));
req.end();
