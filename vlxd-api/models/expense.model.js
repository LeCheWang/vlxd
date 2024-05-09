const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema(
  {
    money: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    account: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'account',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

module.exports = mongoose.model('expense', expenseSchema);
