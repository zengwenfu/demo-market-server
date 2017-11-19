const express = require('express');
const router = express.Router();
import { encryptMd5, cipher, decipher } from '../utils/encrypt';
import parseRes from '../utils/parseRes';
import * as userAction from '../mongo/action/users';
import captcha from '../utils/captcha';
import { sendRegister } from '../utils/email';

/**
 * get UserInfo
 */
router.get('/userinfo', function async (req, res, next) {
  const userInfo = req.session.userInfo || {};
  res.send(parseRes.parseSuccess(userInfo));
});
/**
 * 生成验证码
 */
router.get('/captcha', function (req, res, next) {
  const obj = captcha();
  req.session.captchaCode = obj.code;
  res.send(parseRes.parseSuccess({
    imgData: obj.data
  }));
});

/**
 * 校验验证码
 */
router.get('/checkCaptcha', function (req, res, next) {
  const code = req.param('code');
  let checked = false;
  // 不区分大小写
  if (code.toLocaleLowerCase() === req.session.captchaCode.toLocaleLowerCase()) {
    checked = true;
    req.session.captchaChecked = true;
  } else {
    req.session.captchaChecked = false;
  }
  // 对于验证码错误的不返回 code 0000
  checked ? res.send(parseRes.parseSuccess({ checked })) : res.send(parseRes.PARAM_PARSE_ERROR);
  
});

/**
 * 邮箱解码并设置验证成功标识
 */
router.post('/decipher', async (req, res, next) => {
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

  const [email, endTime] = decipher(params.token).split(',');
  const userMessage = await userAction.findUser(email);
  if(userMessage.isActive) {
    return res.send(parseRes.parseError('0005', '该邮箱已被注册，请重新注册'));
  }
  const nowTime = new Date().getTime();
  if(nowTime > endTime) {
    return res.send(parseRes.parseError('0006', '已过期，请重新发送邮件'));
  }
  const sets = { isActive: true };
  const data = await userAction.updateUser(email, sets);
  res.send(parseRes.parseSuccess(data));
});
/**
 * register
 */
router.post('/register', async (req, res, next) => {
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
  const hasUser = await userAction.findUser(params.email);
  const time = new Date();
  const cipherString = params.email + ',' + (30 * 60 * 1000 + time.getTime());
  const cipherRes = cipher(cipherString);
  params['emailToken'] = cipherRes;
  params['isActive'] = false;
  /**
   *  查询数据库
   */
  const pass = encryptMd5(params.password);
  params['password'] = pass;
  const data = await userAction.save(params);
  // 如果有错误
  if (data && data.err) {
    res.send(data.data);
    return;
  }
  const obj = await sendRegister(params.email, params.nickName, `${process.env.domain}/loginSuccess.html?token=${cipherRes}`);
  if (obj && obj.err) {
    res.send(obj.data);
    return;
  }
  
  res.send(parseRes.parseSuccess(data));
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
  if (data === null) {
    return res.send(parseRes.ACCOUNT_INFO_ERROR);
  }
  if (data.isActive && !data.isActive) {
    return res.send(parseRes.parseError('0001', '此用户尚未激活，请先激活！'));
  }

  delete data.password;

  const userInfo = {
    _id: data._id,
    role: data.role || '0',
    email: data.email
  };

  req.session.userInfo = userInfo;

  res.send(parseRes.parseSuccess(data));
});

module.exports = router;