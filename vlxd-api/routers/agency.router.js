const express = require('express');
const router = express.Router();

const AsyncMiddleware = require('../middlewares/async.middleware');
const RoleMiddleware = require('../middlewares/role.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

const {
  getAgencies,
  createAgency,
  updateAgency,
  deleteAgency,
} = require('../controllers/agency.controller');

router
  .route('/')
  .get(AsyncMiddleware(AuthMiddleware), AsyncMiddleware(getAgencies))
  .post(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware('admin'),
    AsyncMiddleware(createAgency),
  );

router
  .route('/:id')
  .patch(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(updateAgency),
  )
  .delete(
    AsyncMiddleware(AuthMiddleware),
    RoleMiddleware(['admin']),
    AsyncMiddleware(deleteAgency),
  );

module.exports = router;
