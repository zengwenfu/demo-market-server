const connect = require('./connect')

connect().then(() => {
  console.log('成功啦~')
  try {
    var taskAction = require('./action/tasks')
  } catch (e) {
    console.log(e)
  }

  const data = {
    like: false,
    gender: 1,
    desc: '2017/09/20 12:57',
    userId: 'chenyn111'
  }

  taskAction.saveOrUpdate(data).then((model) => {
    return model
  }).then((val) => {
    const data = {
      like: false,
      gender: 1,
      desc: '2017/09/20 12:57',
      userId: 'chenyn111222',
      _id: val
    }
    return taskAction.saveOrUpdate(data)
  }).then((model) => {
    console.log('修改成功')
  })
})