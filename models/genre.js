const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength:5,
        maxlength:50
    }
})
const Genre = new mongoose.model('Genre', genreSchema );

/**
 * 
 * @param {JSON Object} genre
 * Validate the Object: 
 * 1. Must have a name field
 * 2. Name must be longer than 2 letters 
 */
function validateGenre(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).alphanum().required()
    });
    return schema.validate(genre)
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;
