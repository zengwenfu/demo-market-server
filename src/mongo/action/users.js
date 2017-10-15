import mongoose from 'mongoose';
import * as mongoUtil from '../../utils/mongoUtil';
const userModel = mongoose.model('Users');
import parseRes from '../../utils/parseRes';

/**
 * 保存用户信息
 */
export async function save (params) {
  const query = userModel.findOne({ email: params.email });
  const data = await mongoUtil.exec(query);
  if (data && data.err) {
    return data;
  }
  // 用户已存在
  if (data) {
    return {
      err: true,
      data: parseRes.USER_EXIST
    };
  }
  const entity = new userModel(params);
  return await mongoUtil.save(entity);
}

/**
 *  查询用户
 */
export async function findUser (email, password) {
  const query = userModel.findOne({ email, password });
  const data = await mongoUtil.exec(query);
  return data;
}
