const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')

const {login,logout,verifyToken} = require('../controllers/auth');

router.route('/login').post(login)
router.route('/logout').get(authMiddleware,logout)
router.route('/verify-jwt').get(authMiddleware,verifyToken)

module.exports = router;