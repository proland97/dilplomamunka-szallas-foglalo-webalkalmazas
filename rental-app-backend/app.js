const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet')

const authRouter = require('./routes/auth');
const apartmentRoutes = require('./routes/apartment');
const imageRoutes = require('./routes/image');
const commentRoutes = require('./routes/comment');
const amenityRoutes = require('./routes/amenity');
const reservationRoutes = require('./routes/reservation');
const ratingRoutes = require('./routes/rating');
const testRouter = require('./routes/test');
const errorController = require('./controllers/errorController');

// Config
const app = express();
dotenv.config();
const whitelist = [process.env.APP_ADDRESS]
const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(null, false)
        }
    },
    credentials: true
}
require('./db/relations')

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/public/images', express.static(path.join(__dirname, 'public/images')))
    //app.use(helmet()) // todo uncomment and test for production
    // todo add morgan for logging error requests

// Routes
app.use('/auth', cors(corsOptions), authRouter);
app.use('/apartment', cors(corsOptions), apartmentRoutes);
app.use('/image', cors(corsOptions), imageRoutes);
app.use('/comment', cors(corsOptions), commentRoutes);
app.use('/amenity', cors(corsOptions), amenityRoutes);
app.use('/reservation', cors(corsOptions), reservationRoutes);
app.use('/rating', cors(corsOptions), ratingRoutes);
app.use('/test', cors(corsOptions), testRouter);

// Catch 404 error
app.use(cors(corsOptions), errorController.notFoundError);

// Handle server errors
app.use(cors(corsOptions), errorController.serverError);

module.exports = app;