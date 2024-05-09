const jwt = require('jsonwebtoken');
const Account = require('../models/account.model');
const ErrorResponse = require('../helpers/ErrorResponse');
const configuration = require('../configs/configuration');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const message_auth = 'Đăng nhập để trải nghiệm dịch vụ';
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorResponse(401, message_auth);
  }
  const token = authorization.split(' ')[1];

  let decode = jwt.verify(token, configuration.SECRET_KEY);

  const account = await Account.findById(decode._id);
  if (!account) {
    throw new ErrorResponse(401, message_auth);
  }
  req.account = account;
  next();
};
