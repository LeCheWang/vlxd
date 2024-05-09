const express = require('express');
const router = express.Router();

const AsyncMiddleware = require('../middlewares/async.middleware');
const RoleMiddleware = require('../middlewares/role.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

const { login } = require('../controllers/auth.controller');

router.route('/login').post(AsyncMiddleware(login));

module.exports = router;
