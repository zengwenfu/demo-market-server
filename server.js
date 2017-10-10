const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const connectMongo = require('./src/mongo/connect')
const userRouter = require('./src/routers/user.js')



const port = 5001;
const app = express();


app.use(express.static(path.join(__dirname, '/static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
connectMongo().then(() => {
    app.use('/user', userRouter);
}).catch((e) => {
    console.error(e)
})


// 创建应用服务器
const server = http.createServer(app);

server.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.log('启动成功');
});