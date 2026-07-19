const getColors = require('get-image-colors');
getColors('apps/web/public/logo.png').then(colors => {
  console.log(colors.map(color => color.hex()));
}).catch(err => console.error(err));
