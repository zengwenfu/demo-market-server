import mongoose from 'mongoose';
import * as mongoUtil from '../../utils/mongoUtil';
const weeklyModel = mongoose.model('Weekly');
import dateUtil from '../../utils/dateUtil';

const zero = '00';
function getNum (num) {
  num = (parseInt(num) + 1) + '';
  if (num.length < 3) {
    num = zero.substring(0, 3 - num.length) + num;
  }
  return num;
}

/**
 *  保存
 */
export async function saveOrUpdate (data) {
  if (!data._id) {
    const query = weeklyModel.find().sort({createTime: 'desc'}).limit(1).select({
      num: 1
    });
    const result = await mongoUtil.exec(query);
    const num = result.length > 0 ? getNum(result[0].num) : '001';
    data.isPublish = false;
    data.num = num;
    data.createTime = dateUtil.format(new Date());
    const entity = new weeklyModel(data);
    return await mongoUtil.save(entity);
  } else {
    const id = data._id;
    delete data._id;
    data.updateTime = dateUtil.format(new Date());
    const res = await mongoUtil.update(weeklyModel, {_id: id}, { '$set': data });
    if (res.err) return res;
    const query = weeklyModel.findOne({ _id: id });
    return await mongoUtil.exec(query);
  }
}

/**
 * 查询所有已发布
 */
export async function findWeeklys () {
  const query = weeklyModel.find({ isPublish: true }).sort({ _id: 'desc' }).select({
    _id: 1,
    num: 1,
    summary: 1,
    publishTime: 1
  });
  const data = await mongoUtil.exec(query);
  return data;
}

/**
 * 查询未发布
 */
export async function findUnPub () {
  const query = weeklyModel.findOne({ isPublish: false });
  const data = await mongoUtil.exec(query);
  return data;
}

/**
 * 根据 id 查询
 */
export async function findById (id) {
  const query = weeklyModel.findOne({ _id: id });
  const data = await mongoUtil.exec(query);
  return data;
}