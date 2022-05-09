const auth = require('../middlewares/auth');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

/**
 * Send all the customers in json format
 */
router.get('/', auth, async (req, res)=>{
    try{
        const customer = await Customer.find();
        res.send(customer);
    }catch(err){
        console.log('GET Error: ',err.message);
        res.status(404).send('Unable to find customers.');
    }
});

/**
 * Add new customer to the list
 */
router.post('/', auth, async (req, res)=>{
    const { value, error } = validate(req.body);
    if( error ) return(res.status(400).send(`Invalid Request: ${error.details[0].message}`));
    try{
        const customer = new Customer(value);
        const result = await customer.save();
        res.send(result);    
    }catch(err){
        console.log('POST Error:', err.message);
        res.status(404).send('Unable to add Customer');
    }
});

/**
 * Get a customer
 */
router.get('/:id', auth, async (req, res)=>{
    try{
        const customer = await Customer.findById(req.params.id);
        if(!customer) throw new Error('NULL Returned');
        res.status(200).send(customer);
    }catch(err){
        console.log('GET Error:', err.message);
        return(res.status(404).send(`No Customer with ID: ${req.params.id} found!`));
    }
});

/**
 * Edit a customer
 */
router.put('/:id', auth, async (req, res)=>{
    const { value, error } = validate(req.body);
    if(error) return( res.status(400).send(`Invalid Customer: ${error.details[0].message}`) );
    try{
        const customer = await Customer.findByIdAndUpdate(req.params.id, value, { new: true, useFindAndModify: false});
        if(!customer) throw new Error('NULL Returned');
        res.send(customer);
    }catch(err){
        console.log('PUT Error:', err.message);
        return( res.status(404).send(`No Customer with ID: ${req.params.id} found!`) );
    }
});

/**
 * Delete a customer
 */
router.delete('/:id', auth, async (req, res)=>{
    try{
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if(!customer) throw new Error('NULL Returned');
        res.send(customer);
    }catch(err){
        console.log('DELETE Error: ', err.message);
        return( res.status(404).send(`No Customer with ID: ${req.params.id} found!`));
    }
    
});


module.exports = router;