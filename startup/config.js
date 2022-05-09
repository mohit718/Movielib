const config = require('config');
const winston = require('winston');

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('Fatel Error: movielib_jwtPrivateKey not defined ');
    }
}