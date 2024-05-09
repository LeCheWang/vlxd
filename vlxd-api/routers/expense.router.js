const express = require('express');
const router = express.Router();

const AsyncMiddleware = require('../middlewares/async.middleware');
const RoleMiddleware = require('../middlewares/role.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense.controller');

router
  .route('/')
  .get(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['driver', 'admin']),
    AsyncMiddleware(getExpenses),
  )
  .post(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware('driver'),
    AsyncMiddleware(createExpense),
  );

router
  .route('/:id')
  .patch(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(updateExpense),
  )
  .delete(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['driver', 'admin']),
    AsyncMiddleware(deleteExpense),
  );

module.exports = router;
