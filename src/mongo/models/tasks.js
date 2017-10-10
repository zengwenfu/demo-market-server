const mongoose = require('mongoose')

// Schema   一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
const schema = mongoose.Schema

// 任务
const modelName = 'Tasks'
const tableName = 'tasks'

const tableSchema = new mongoose.Schema({
  userId: String,
  opend: Boolean,
  gender: Number,
  desc: String
})

tableSchema.index({ gender: -1, userId: -1})

// Model  由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
mongoose.model(modelName, tableSchema, tableName)