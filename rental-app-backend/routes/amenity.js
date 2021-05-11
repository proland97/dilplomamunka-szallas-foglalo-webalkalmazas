const express = require('express');
const router = express.Router();

const amenityController = require('../controllers/amenityController')
const { authCheck } = require('../middleware/authCheck')

router.post('/', authCheck, amenityController.create)

router.put('/', authCheck, amenityController.update)

router.delete('/:id', authCheck, amenityController.delete)

module.exports = router;