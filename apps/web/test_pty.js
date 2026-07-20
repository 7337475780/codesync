try {
  console.log('Requiring node-pty...');
  const pty = require('node-pty');
  console.log('Successfully loaded node-pty!');
} catch (err) {
  console.error('Failed to load node-pty:', err);
}
