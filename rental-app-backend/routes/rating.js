const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/authCheck')
const ratingController = require('../controllers/ratingController')

router.post('/', authCheck, ratingController.createRating)

router.put('/', authCheck, ratingController.updateRating)

router.get('/apartment/:id', ratingController.getRatingsForApartment)

router.get('/stat/apartment/:id', ratingController.getRatingStat)

router.delete('/:id', authCheck, ratingController.deleteRating)

module.exports = router;