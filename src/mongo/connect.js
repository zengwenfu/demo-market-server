const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  return new Promise((resolve, reject) => {
    // 创建数据库链接
    mongoose.connect(config.mongodb, {
      useMongoClient: true
    });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connect error:'));

    db.once('open', () => {
      console.log('mongoose has connected');
      resolve();
    });

    console.log('ohohoh');
    require('./models/users');
    require('./models/tasks');
  });
};
