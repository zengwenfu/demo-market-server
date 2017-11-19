/**
 *  注册 babel
 */
require('babel-core/register');

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectMongo = require('./src/mongo/connect');
const adminCheckMiddleware = require('./src/middleware/adminCheck');

const port = 5001;
const app = express();

process.env.domain = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000/dist' : 'http://dm.facemagic888.com';

app.use(express.static(path.join(__dirname, '/static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
}));

connectMongo().then(() => {
  // 管理员权限拦截
  app.use('/weekly/admin/*', adminCheckMiddleware);

  // router 的 require 也要放到 mongo 注册之后，否则导入 modal 有问题
  app.use('/user', require('./src/routers/user.js'));
  app.use('/weekly', require('./src/routers/weekly.js'));
}).catch((e) => {
  console.error(e);
});


// 创建应用服务器
const server = http.createServer(app);

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.log('启动成功');
});