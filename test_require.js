try {
  const compression = require('./node_modules/mongodb/lib/cmap/wire_protocol/compression.js');
  console.log('Success loading compression.js');
} catch (e) {
  console.error('Failure loading compression.js');
  console.error(e);
}
