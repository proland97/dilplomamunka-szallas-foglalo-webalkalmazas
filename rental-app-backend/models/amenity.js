const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const sequelize = require('../db/database');

const Amenity = sequelize.define('amenity', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    indexes: [{
        unique: true,
        fields: ['apartmentId', 'type']
    }]
});

Amenity.beforeSave(async(amenity, options) => {

    let existing = await Amenity.findOne({
        where: {
            apartmentId: amenity.apartmentId,
            type: amenity.type,
            id: {
                [Op.ne]: amenity.id
            }
        }
    })
    if (existing) throw new Error('Amenity already exist in the Apartment')

});
module.exports = Amenity;