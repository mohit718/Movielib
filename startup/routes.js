const express = require('express');
const errors = require('../middlewares/errors');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function (app) {
	app.get('/', (req, res) => res.send('Yes Bro Connected'));
	app.use(express.json());
	app.use('/api/genres', genres);
	app.use('/api/customers', customers);
	app.use('/api/movies', movies);
	app.use('/api/rentals', rentals);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use(errors);
};
