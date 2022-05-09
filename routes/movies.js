const auth = require('../middlewares/auth');
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const movies = await Movie.find();
        res.send(movies);
    }catch(err){
        res.status(400).send(err.message);
    }
});

router.post('/', auth, async(req, res)=>{
    const {value, error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    console.log(value);
    
    const genre = await Genre.findById(value.genreId);
    if(!genre)return res.status(400).send('GenreId Invalid');
    
    try{
        const movie = new Movie({
            title: value.title,
            numberInStock:  parseInt(value.numberInStock),
            dailyRentalRate:  parseInt(value.dailyRentalRate),
            genre: {
                _id: genre._id,
                name: genre.name
            }
        });
        const result = await movie.save();
        return res.send(result);
    }catch(err){
        console.log(err);
        return res.status(400).send(err.message);
    }
});



module.exports = router;