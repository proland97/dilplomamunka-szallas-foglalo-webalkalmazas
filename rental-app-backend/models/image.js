const fs = require('fs')
const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Image = sequelize.define('image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    format: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    path: {
        type: Sequelize.Sequelize.STRING(1024),
        allowNull: false,
    },
    isCoverImage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    }
});

Image.beforeDestroy(async(image, options) => {
    try {
        fs.unlinkSync(image.path);
    } catch (error) {
        console.log(error);
    }
});

module.exports = Image;