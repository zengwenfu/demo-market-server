const mongoose = require('mongoose')
const taskModel = mongoose.model('Tasks')

const findByGender = (gender, userId) => {
  return new Promise((resolve, reject) => {
    taskModel.find({
      gender: gender,
      userId: userId
    }).sort({
      start: 'asc'
    }).exec((err, data) => {
      resolve(data)
    })
  })
}

const saveOrUpdate = (data) => {
  return new Promise((resolve, reject) => {
    if (!data._id) {
      // 保存
      const entity = new taskModel(data)
      entity.save((err) => {
        if (err != null) {
          console.log(err)
          reject(err)
        }

        resolve(entity._id)
      })

    } else {
      const id = data._id
      delete data._id
      taskModel.update({
        _id: id
      }, {
        '$set': data
      }, (err, num) => {
        if (err != null) {
          console.log(err)
          reject(err)
        }
        resolve(id)
      })
    }
  })
}

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    if (id != null && id != '') {
      taskModel.remove({
        _id: id
      }, (err) => {
        if (err != null) {
          reject(err)
        } else {
          console.log('resolve')
          resolve()
        }
      })
    } else {
      reject('id不能为空')
    }
  });
}

module.exports = {
  findByGender,
  saveOrUpdate,
  deleteById
}