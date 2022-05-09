const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { func } = require('joi');
const passwordComplexity = require("joi-password-complexity").default;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.getAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);


function validateUser(user){
    const complexityOptions = {
        min: 5,
        max: 1024,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
      };
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().required().email(),
        password: passwordComplexity().required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;