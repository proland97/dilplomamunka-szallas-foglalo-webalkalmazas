const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../db/database');
const Reservation = require('../models/reservation')
const Apartment = require('../models/apartment')
const { Op } = require("sequelize");

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user',
    }
});

User.beforeDestroy(async(user, options) => {

    let today = new Date()
    today = new Date(today.toISOString().split('T')[0])

    let apartments = await Apartment.findOne({ where: { userId: user.id } })
    if (apartments) throw new Error('Cant delete user, which has apartments')

    let reservations = await Reservation.findOne({
        where: {
            userId: user.id,
            endDate: {
                [Op.gte]: today
            }
        }
    })
    if (reservations) throw new Error('Cant delete user, which has future reservations')
});

User.beforeCreate(async(user, options) => {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
});

module.exports = User;