const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Rating = sequelize.define('rating', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    stars: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Rating.beforeCreate(async(rating, options) => {

    let existingRating = await Rating.findOne({ where: { apartmentId: rating.apartmentId, userId: rating.userId } })
    if (existingRating) throw new Error('User already rated this apartment')
});

module.exports = Rating;