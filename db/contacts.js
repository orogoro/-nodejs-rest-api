const mongoose = require('mongoose');
require('dotenv').config();

const ConnectMongo = mongoose.connect(process.env.DB_HOST);

module.exports = { ConnectMongo };
