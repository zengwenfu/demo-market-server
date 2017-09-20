const mongoose = require('mongoose')
const userModel = mongoose.model('Users')

module.exports = {
  save(userId, data) {
    return new Promise((resolve, reject) => {
      userModel.findOne({
        userId: userId
      }).exec((err, model) => {
        // 已经存在此 userid
        if (model) {
          resolve()
        } else {
          data.userId = userId
          const entity = new userModel(data)
          entity.save((err) => {
            if (err != null) {
              console.log(err)
            }
            resolve(entity._id)
          })
        }
      })
    })
  }
}