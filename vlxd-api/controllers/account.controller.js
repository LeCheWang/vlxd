const Account = require('../models/account.model');

module.exports = {
  getAccounts: async (req, res) => {
    const { is_delete = false } = req.query;
    const accounts = await Account.find({
      role: { $ne: 'admin' },
      is_delete,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json(accounts);
  },
  createAccount: async (req, res) => {
    const body = req.body;
    const newAccount = await Account.create(body);

    return res.status(201).json(newAccount);
  },
  updateAccount: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const updatedAccount = await Account.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedAccount);
  },
  deleteAccount: async (req, res) => {
    const id = req.params.id;
    const deletedAccount = await Account.findByIdAndUpdate(id, {
      is_delete: true,
    });
    return res.status(200).json(deletedAccount);
  },
};
