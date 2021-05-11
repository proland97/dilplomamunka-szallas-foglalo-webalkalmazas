const Sequelize = require('sequelize');
const config = require('./dbConfig');
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

const sequelize = new Sequelize(environmentConfig.dbname, environmentConfig.dbuser, environmentConfig.dbpass, {
    host: environmentConfig.host,
    dialect: environmentConfig.dialect,
    port: environmentConfig.port,
    logging: environmentConfig.logging,
})

module.exports = sequelize;