const config = require('config');
const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = function(){
    mongoose.connect(config.get('db'), { useUnifiedTopology: true })
    .then(winston.info('Connected to Database'));
}