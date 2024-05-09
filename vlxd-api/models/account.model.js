const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const configuration = require('../configs/configuration');

const accountSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: 'Nam',
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    license_plates: {
      type: String,
      required: true,
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'driver'],
      default: 'driver',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

accountSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
  },
});

accountSchema.pre('save', function (next) {
  const account = this;
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      configuration.SALT_ROUND,
    );
  }
  next();
});

accountSchema.pre('findOneAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      configuration.SALT_ROUND,
    );
  }
  this.setUpdate(account);
  next();
});

accountSchema.pre('findByIdAndUpdate', function (next) {
  const account = { ...this.getUpdate() };
  if (account.password) {
    account.password = bcryptjs.hashSync(
      account.password,
      configuration.SALT_ROUND,
    );
  }
  this.setUpdate(account);
  next();
});

module.exports = mongoose.model('account', accountSchema);
