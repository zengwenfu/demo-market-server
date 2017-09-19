const connect = require('./connect')

connect().then(() => {
  console.log('成功啦~')
  try {
    var taskDao = require('./dao/tasks')
  } catch (e) {
    console.log(e)
  }

  const data = {
    like: false,
    gender: 1,
    desc: '贝贝啊',
    userId: 'liexiaobei'
  }

  taskDao.deleteById('59c10f18b3c36113b0f5099e').then((model) => {
    console.log(model)
  })
})