const app = require('../app');
const db = require('../db/database')
require('dotenv').config();

db.authenticate().then(res => {
    console.log(`PostgreSQL Database connected on port: ${process.env.DB_PORT}`);
}).catch((err) => {
    console.log(err);
});

app.listen(process.env.APP_PORT || 5000, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(`Server started on port: ${process.env.APP_PORT}`)
});