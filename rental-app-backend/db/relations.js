const Apartment = require('../models/apartment')
const User = require('../models/user')
const Image = require('../models/image')
const Comment = require('../models/comment')
const Amenity = require('../models/amenity')
const Reservation = require('../models/reservation')
const Rating = require('../models/rating')

Apartment.belongsTo(User, { constraints: true })
User.hasMany(Apartment)

Image.belongsTo(Apartment, { constraints: true })
Apartment.hasMany(Image)

Comment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Comment)
Comment.belongsTo(Apartment, { constraints: true, onDelete: 'CASCADE' })
Apartment.hasMany(Comment)

Amenity.belongsTo(Apartment, { constraints: true, onDelete: 'CASCADE' })
Apartment.hasMany(Amenity)

Reservation.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Reservation)
Reservation.belongsTo(Apartment, { constraints: true, onDelete: 'CASCADE' })
Apartment.hasMany(Reservation)

Rating.belongsTo(User, { constraints: true, onDelete: 'SET NULL' })
User.hasMany(Rating)
Rating.belongsTo(Apartment, { constraints: true, onDelete: 'CASCADE' })
Apartment.hasMany(Rating)