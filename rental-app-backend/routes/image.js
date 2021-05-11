const express = require('express');
const router = express.Router();

const imageController = require('../controllers/imageController')
const { authCheck } = require('../middleware/authCheck')

router.post('/upload-images', authCheck, imageController.uploadImages) // TODO Handle unexpected filed error

router.delete('/delete-image/:id', authCheck, imageController.deleteImage)

module.exports = router;