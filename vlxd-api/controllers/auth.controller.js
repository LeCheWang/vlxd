const Account = require('../models/account.model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const ErrorResponse = require('../helpers/ErrorResponse');
const configuration = require('../configs/configuration');

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    const account = await Account.findOne({ username, is_delete: false });
    if (!account) {
      throw new ErrorResponse(400, 'Tài khoản hoặc mật khẩu không đúng');
    }

    const checkPass = bcryptjs.compareSync(password, account.password);
    if (!checkPass) {
      throw new ErrorResponse(400, 'Tài khoản hoặc mật khẩu không đúng');
    }

    const payload = {
      _id: account._id,
      username: account.username,
      license_plates: account.license_plates,
      role: account.role,
    };

    const token = jwt.sign(payload, configuration.SECRET_KEY, {
      expiresIn: configuration.EXPIRES_IN,
    });

    return res.status(200).json({
      ...payload,
      jwt: token,
    });
  },
};
