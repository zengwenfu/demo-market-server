const express = require('express');
const router = express.Router();

router.get('/userinfo', function (req, res, next) {
	const data = {
		email: '1129330609',
		nickname: '小虫'
	}
	res.send(JSON.stringify(data))
})

module.exports = router;