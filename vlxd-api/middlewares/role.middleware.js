const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (roles.length && !roles.includes(req.account.role)) {
      throw new ErrorResponse(403, 'Không có quyền truy cập');
    }
    next();
  };
};
