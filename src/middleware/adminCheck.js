import parseRes from '../utils/parseRes';

function adminCheck (req, res, next) {
  const userInfo = req.session.userInfo;
  if (!userInfo) {
    res.send(parseRes.NO_LOGIN);
  } else if (userInfo.role !== '1') {
    res.send(parseRes.NO_ADMIN);
  } else {
  	next();
  }
}

module.exports = adminCheck;