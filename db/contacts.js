const mongoose = require('mongoose');
require('dotenv').config();

const ConnectMongo = mongoose.connect(process.env.DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { ConnectMongo };
