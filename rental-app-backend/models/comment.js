const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

module.exports = Comment;