const express = require('express');
const router = express.Router();
import { encryptMd5 } from '../utils/encrypt';
import parseRes from '../utils/parseRes';
import * as userModal from '../mongo/action/users';

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
router.get('/login', async (req, res, next) => {
  const data = await userModal.findUser('1129330609@qq.com', 'e10adc3949ba59abbe56e057f20f883e');
  res.send(parseRes.parseSuccess(data));
});

module.exports = router;