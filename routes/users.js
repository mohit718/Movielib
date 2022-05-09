const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();


router.get('/me', auth, async(req, res)=>{
    const user = await User.findById(req.user._id).select('name email');
    res.send(user);
});

router.get('/', auth, async(req, res)=>{
    const users  = await User.find().sort();
    if(!users) return res.status(400).send('Cannot get users');

    res.send(users);
});
router.post('/', async(req, res)=>{
    const { value, error } = validate(req.body);
    if(error) return res.status(400).send('Invalid Data');

    let user = await User.findOne({email: value.email});
    if(user) return res.status(400).send('Email already registered!');
    
    user = new User(_.pick(value, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    
    const token = user.getAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;