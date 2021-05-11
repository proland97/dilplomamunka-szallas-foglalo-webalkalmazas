const express = require('express');
const router = express.Router();

const { authCheck } = require('../middleware/authCheck')
const reservationController = require('../controllers/reservationController')

router.post('/', authCheck, reservationController.createReservation)

router.get('/own', authCheck, reservationController.getOwnReservations)

router.get('/to-me', authCheck, reservationController.getReservationForMyApartment)

router.get('/apartment/:id', reservationController.getReservationsByApartment)

router.get('/:id', reservationController.getReservation)

router.delete('/:id', authCheck, reservationController.deleteReservation)

module.exports = router;