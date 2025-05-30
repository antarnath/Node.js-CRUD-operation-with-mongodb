const mongoose = require('mongoose');

// 'mongodb://localhost:27017/userdb'
async function connectMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = connectMongoDB;