const db = require('./database')
require('./relations')

// Synchronizing Database
db.sync({ force: true }).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});