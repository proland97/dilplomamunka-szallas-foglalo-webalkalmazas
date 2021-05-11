require('dotenv').config()

module.exports = {
    development: {
        dbname: process.env.DB_NAME,
        dbuser: process.env.DB_USER,
        dbpass: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: console.log
    },
    test: {
        dbname: process.env.TEST_DB_NAME,
        dbuser: process.env.TEST_DB_USER,
        dbpass: process.env.TEST_DB_PASSWORD,
        host: process.env.TEST_DB_HOST,
        dialect: process.env.TEST_DB_DIALECT,
        port: process.env.TEST_DB_PORT,
        logging: false
    },
    production: {}
};