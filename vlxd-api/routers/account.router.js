const express = require('express');
const router = express.Router();

const AsyncMiddleware = require('../middlewares/async.middleware');
const RoleMiddleware = require('../middlewares/role.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require('../controllers/account.controller');

router
  .route('/')
  .get(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware('admin'),
    AsyncMiddleware(getAccounts),
  )
  .post(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware('admin'),
    AsyncMiddleware(createAccount),
  );

router
  .route('/:id')
  .patch(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(updateAccount),
  )
  .delete(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(deleteAccount),
  );

module.exports = router;
