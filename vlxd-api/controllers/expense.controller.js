const Expense = require('../models/expense.model');
const Account = require('../models/account.model');
const moment = require('moment');
const { isValidDate } = require('../validations/date.valid');

module.exports = {
  getExpenses: async (req, res) => {
    const account = req.account;
    const { fromDate, toDate, username } = req.query;
    const bodyQuery = {};

    if (isValidDate(fromDate)) {
      const targetDate = new Date(fromDate);
      const nextDay = isValidDate(toDate) ? new Date(toDate) : new Date();

      bodyQuery.createdAt = {
        $gte: targetDate,
        $lte: nextDay,
      };
    } else {
      const today = moment().startOf('day');
      bodyQuery.createdAt = {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      };
    }

    if (username) {
      const account = await Account.findOne({ username });
      bodyQuery.account = account?._id;
    }
    if (account.role === 'driver') {
      bodyQuery.account = account._id;
    }

    const expenses = await Expense.find(bodyQuery)
      .sort({
        createdAt: -1,
      })
      .populate('account');

    return res.status(200).json(expenses);
  },
  createExpense: async (req, res) => {
    const account = req.account;
    const { money, note } = req.body;
    const newExpense = await Expense.create({
      money,
      note,
      account: account._id,
    });
    return res.status(201).json(newExpense);
  },
  updateExpense: async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedExpense);
  },

  deleteExpense: async (req, res) => {
    const id = req.params.id;
    const account = req.account;

    const bodyQuery = {
      _id: id,
    };

    if (account.role !== 'admin') {
      bodyQuery.account = account._id;
    }

    const deletedExpense = await Expense.findOneAndDelete(bodyQuery);
    return res.status(200).json(deletedExpense);
  },
};
