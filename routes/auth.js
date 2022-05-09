const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity").default;
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    const users  = await User.find().sort();
    if(!users) return res.status(400).send('Cannot get users');

    res.send(users);
});
router.post('/', async(req, res)=>{
    const { value, error } = validate(req.body);
    if(error) return res.status(400).send('Invalid Data');

    let user = await User.findOne({email: value.email});
    if(!user) return res.status(400).send('Email/ Password Incorrect!');
    
    const result = await bcrypt.compare(value.password, user.password); 
    if(!result) return res.status(400).send('Email/ Password Incorrect!');

    const token = user.getAuthToken();
    res.send(token);

});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: passwordComplexity().required()
    });
    return schema.validate(req);
}

module.exports = router;