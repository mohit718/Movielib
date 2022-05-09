const mongoose = require('mongoose');
const Joi = require('joi');
const { Genre, genreSchema } = require('./genre');

const Movie  = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Movie Title is required.'],
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    numberInStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: [true, 'Daily rental must be specified'],
        min: 0,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: [true, 'Genre is required']
    }
}));

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        numberInStock: Joi.number().min(2).max(255),
        dailyRentalRate: Joi.number().min(2).max(255).required(),
        genreId: Joi.objectId().required()
    });
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;