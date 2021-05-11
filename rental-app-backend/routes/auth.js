const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')
const { authCheck } = require('../middleware/authCheck')

router.post('/signup', authController.signup)

router.post('/login', authController.login)

router.post('/resetpassword', authCheck, authController.resetPassword)

router.put('/update', authCheck, authController.update)

router.delete('/user', authCheck, authController.deleteUser)

module.exports = router;