module.exports = (function db_connection() {
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/qumram');

  var db = mongoose.connection;

  db.on('error', function () {
    throw new Error('Database problems. Exiting !!!');
  });

  console.log('Dabase connection initialized');
  return { mongoose: mongoose, db: db};
})();
