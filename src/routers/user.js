const express = require('express');
const router = express.Router();
import { encryptMd5 } from '../utils/encrypt';
import parseRes from '../utils/parseRes';
import * as userAction from '../mongo/action/users';

/**
 * for test
 */
router.get('/userinfo', function (req, res, next) {
  const data = {
    email: '1129330609',
    nickname: '小虫'
  };
  res.send(JSON.stringify(data));
});

/**
 *  login
 */
router.post('/login', async (req, res, next) => {
  // TODO 校验验证码
  
  /**
   * 获取参数
   */
  let params;
  try {
    params = JSON.parse(req.body.data);
  } catch (e) {
    res.send(parseRes.PARAM_PARSE_ERROR);
    return;
  }

  /**
   * 参数校验
   */
  if (!params.email) {
    res.send(parseRes.EMAIL_IS_NEED);
    return;
  }

  // TODO 邮箱格式校验
  
  if (!params.password) {
    res.send(parseRes.PASS_IS_NEED);
  }

  /**
   *  查询数据库
   */
  const pass = encryptMd5(params.password);
  const data = await userAction.findUser(params.email, pass);
  // 如果有错误
  if (data && data.err) {
    res.send(data.data);
    return;
  }

  // TODO 将用户信息加入 session 中
  
  res.send(parseRes.parseSuccess(data));
});

module.exports = router;