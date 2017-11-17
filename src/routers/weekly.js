const express = require('express');
const router = express.Router();
import parseRes from '../utils/parseRes';
import * as weeklyAction from '../mongo/action/weekly';

/**
 *  添加或保存
 */
router.post('/saveOrUpdate', async (req, res, next) => {
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

  const data = await weeklyAction.saveOrUpdate(params);
  // 如果有错误
  if (data && data.err) {
    res.send(data.data);
    return;
  }
  
  res.send(parseRes.parseSuccess(data));
});

/**
 *  查询未发布
 */
router.get('/findUnPub', async (req, res, next) => {
  const data = await weeklyAction.findUnPub();
  // 如果有错误
  if (data && data.err) {
    res.send(data.data);
    return;
  }
  
  res.send(parseRes.parseSuccess(data));
});

/**
 *  查询所有已发布
 */
router.get('/findWeeklys', async (req, res, next) => {
  const data = await weeklyAction.findWeeklys();
  // 如果有错误
  if (data && data.err) {
    res.send(data.data);
    return;
  }
  
  res.send(parseRes.parseSuccess(data));
});

/**
 *  publish
 */
router.get('/publish', async (req, res, next) => {
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
  
  const obj = {
    _id: params.id,
    isPublish: true
  };

  const data = await weeklyAction.saveOrUpdate(obj);
  // 如果有错误
  if (data && data.err) {
    res.send(data.data);
    return;
  }
  
  res.send(parseRes.parseSuccess(data));

});

module.exports = router;