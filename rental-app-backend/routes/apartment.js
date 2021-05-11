const express = require('express');
const router = express.Router();

const apartmentController = require('../controllers/apartmentController')
const { authCheck } = require('../middleware/authCheck')

router.post('/', authCheck, apartmentController.createApartment)

router.get('/', apartmentController.getApartments)

router.put('/', authCheck, apartmentController.updateApartment)

router.get('/own', authCheck, apartmentController.getOwnApartments)

router.get('/search/:name', authCheck, apartmentController.getApartmentByName)

router.get('/:id', apartmentController.getApartment)

router.delete('/:id', authCheck, apartmentController.deleteApartment)

module.exports = router;