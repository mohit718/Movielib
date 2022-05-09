const mongoose = require('mongoose');
const { validate } = require('./genre');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: [true, 'name is required'],
                minlength: 3,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: [true, 'phone is required'],
                length: [10, 'Must be a 10 digit number']
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required: [true, 'Movie Title is required.'],
                trim: true,
                minlength: 2,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: [true, 'Daily rental must be specified'],
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now() 
    },
    dateReturned: {
        type: Date
    },
    rentalFee:{
        type: Number,
        min:0
    }
}));

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;