const mongoose = require('mongoose');

// Schema   一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
const schema = mongoose.Schema;

// 任务
const modelName = 'Users';
const tableName = 'users';

const tableSchema = new mongoose.Schema({
  id: String,
  // 头像
  avatarUrl: String,
  // 昵称
  nickName: String,
  // email
  email: String,
  // pass
  password: String,
  // 出生日期
  birthday: String,
  //城市
  city: String,
  //国家
  country: String,
  //性别 0：未知、1：男、2：女
  gender: Number,
  //语言
  language: String,
  //昵称
  nickName: String,
  //省份
  province: String,
  //加入时间
  inTime: String,
  //更新时间
  updateTime: String,
  // 账户
  account: {
    score: String,
    money: String
  }
});

// Model  由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
mongoose.model(modelName, tableSchema, tableName);