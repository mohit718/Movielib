const auth = require('../middlewares/auth');
const Fawn = require('fawn');
const {Rental, validate} = require('../models/rental');
const express = require('express');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', auth, async(req, res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    if(rentals) return res.send(rentals)
    return res.status(404).send('No rentals');
});

router.post('/', auth, async(req, res)=>{
    const {value, error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(value.customerId);
    if(!customer) return res.status(400).send('Invalid Customer');
    
    const movie = await Movie.findById(value.movieId);
    if(!movie) return res.status(400).send('Invalid Movie');

    if(movie.numberInStock==0) return res.status(400).send('Movie not available');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });

    try{
        const result = new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id:movie._id}, {
                $inc : {numberInStock: -1}
            })
            .run();
        res.send(rental);
    }catch(ex){
        res.status(500).send(`Invalid ID :${ex.message}`);
    }
    

});


module.exports = router;