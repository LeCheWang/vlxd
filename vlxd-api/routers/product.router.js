const express = require('express');
const router = express.Router();

const AsyncMiddleware = require('../middlewares/async.middleware');
const RoleMiddleware = require('../middlewares/role.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

router
  .route('/')
  .get(AsyncMiddleware(AuthMiddleware), AsyncMiddleware(getProducts))
  .post(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware('admin'),
    AsyncMiddleware(createProduct),
  );

router
  .route('/:id')
  .patch(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(updateProduct),
  )
  .delete(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(deleteProduct),
  );

module.exports = router;
