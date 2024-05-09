const mongoose = require('mongoose');
const configuration = require('./configuration');
const Account = require('../models/account.model');

const connectDB = async () => {
  try {
    await mongoose.connect(configuration.DB_URL);

    const adminAcc = await Account.findOne({
      username: configuration.ADMIN_ACC.username,
    });

    if (!adminAcc) {
      await Account.create(configuration.ADMIN_ACC);
      console.log('admin created');
    }

    console.log('Kết nối db thành công');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
