const express = require('express');
const router = express.Router();

const AsyncMiddleware = require('../middlewares/async.middleware');
const RoleMiddleware = require('../middlewares/role.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

const {
  getDeliveryHistories,
  createDeliveryHistory,
  updateDeliveryHistory,
  deleteDeliveryHistory,
  exportExcelFile,
} = require('../controllers/delivery-history.controller');

router
  .route('/')
  .get(AsyncMiddleware(AuthMiddleware), AsyncMiddleware(getDeliveryHistories))
  .post(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin', 'driver']),
    AsyncMiddleware(createDeliveryHistory),
  );

router
  .route('/export')
  .get(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware('admin'),
    AsyncMiddleware(exportExcelFile),
  );

router
  .route('/:id')
  .patch(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(updateDeliveryHistory),
  )
  .delete(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(deleteDeliveryHistory),
  );

module.exports = router;
