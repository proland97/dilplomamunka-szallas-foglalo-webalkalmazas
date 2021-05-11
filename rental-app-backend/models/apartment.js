const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const Image = require('./image')
const Reservation = require('../models/reservation')
const { Op } = require("sequelize");

const Apartment = sequelize.define('apartment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pricePerDay: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    rooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Apartment.beforeDestroy(async(apartment, options) => {

    let today = new Date()
    today = new Date(today.toISOString().split('T')[0])

    let reservations = await Reservation.findOne({
        where: {
            apartmentId: apartment.id,
            endDate: {
                [Op.gte]: today
            }
        }
    })

    if (reservations) throw new Error('Can not delete apartment, which has future reservations')

    try {
        const images = await Image.findAll({ where: { apartmentId: apartment.id } })
        await images.forEach(async(image) => {
            await image.destroy()
        })

    } catch (error) {
        console.log(error);
    }
});

module.exports = Apartment;