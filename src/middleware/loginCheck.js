import parseRes from '../utils/parseRes';

function loginCheck (req, res, next) {
  const userInfo = req.session.userInfo;
  if (!userInfo) {
    res.send(parseRes.NO_LOGIN);
  } else {
    next();
  }
}

module.exports = loginCheck;