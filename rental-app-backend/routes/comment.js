const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/authCheck')
const commentController = require('../controllers/commentController')

router.post('/', authCheck, commentController.createComment)

router.put('/', authCheck, commentController.updateComment)

router.get('/apartment/:id', commentController.getCommentsForApartment)

router.get('/:id', commentController.getComment)

router.delete('/:id', authCheck, commentController.deleteComment)

module.exports = router;