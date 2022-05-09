const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { Genre, validate} = require('../models/genre');
const express = require('express');
const { reject } = require('lodash');
const router = express.Router();

/**
 * Send all the genres in json format
 */
router.get('/',  async(req, res)=>{
    const genres = await Genre.find();
    res.send(genres);
});

/**
 * Add new genre to the list
 */
router.post('/', auth, async (req, res)=>{
    const { value, error } = validate(req.body);
    if( error ) return(res.status(400).send(`Invalid Request: ${error.details[0].message}`));
    try{
        const genre = new Genre(value);
        const result = await genre.save();
        res.send(result);
    }catch(err){
        console.log('POST Error:', err.message);
        res.status(404).send('Unable to insert genre.');
    }
});

/**
 * Get a genre
 */
router.get('/:id', async (req, res)=>{
    try{
        const genre = await Genre.findById(req.params.id);
        if(!genre) throw new Error('NULL Returned');
        res.status(200).send(genre);
    }catch(err){
        console.log('GET Error:', err.message);
        return(res.status(404).send(`No Genre with ID: ${req.params.id} found!`));
    }
});

/**
 * Edit a genre
 */
router.put('/:id', auth, async (req, res)=>{
    const { value, error } = validate(req.body);
    if(error) return( res.status(400).send(`Invalid Genre: ${error.details[0].message}`) );
    try{
        const genre = await Genre.findByIdAndUpdate(req.params.id, value, { new: true, useFindAndModify: false});
        if(!genre) throw new Error('NULL Returned');
        res.send(genre);
    }catch(err){
        console.log('PUT Error:', err.message);
        return( res.status(404).send(`No Genre with ID: ${req.params.id} found!`) );
    }
});

/**
 * Delete a genre
 */
router.delete('/:id', [auth, admin], async (req, res)=>{
    try{
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if(!genre) throw new Error('NULL Returned');
        res.send(genre);
    }catch(err){
        console.log('DELETE Error: ', err.message);
        return( res.status(404).send(`No Genre with ID: ${req.params.id} found!`));
    }
    
});

module.exports = router;