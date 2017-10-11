const express = require('express');
const router = express.Router();
const encrypt = require('../utils/encrypt');

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
router.get('/login', (req, res, next) => {
  res.send(encrypt.encryptMd5('12345'));
});

module.exports = router;