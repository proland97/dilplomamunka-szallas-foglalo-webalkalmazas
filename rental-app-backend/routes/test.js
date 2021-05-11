const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { authCheck } = require('../middleware/authCheck')


router.get('/', authCheck, async(req, res, next) => {

    let user = await User.findAll();
    res.json(req.user)
});

module.exports = router;