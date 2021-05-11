const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const { isDateBetween } = require('../util/dateCheck')

const Reservation = sequelize.define('reservation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    }
});

Reservation.beforeSave(async(currentReservation, options) => {

    let reservations = await Reservation.findAll({ where: { apartmentId: currentReservation.apartmentId }, attributes: ['startDate', 'endDate'] })
    reservations.forEach((reservation) => {
        if (isDateBetween(
                new Date(reservation.startDate),
                new Date(reservation.endDate),
                new Date(currentReservation.startDate),
                new Date(currentReservation.endDate)
            )) throw new Error('Apartment is reserved in this period')
    })

});

module.exports = Reservation;