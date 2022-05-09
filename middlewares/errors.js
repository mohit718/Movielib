const winston = require('winston');

module.exports=function(err, req, res, next){
    //[error, warn, info, verbose, debug, silly]
    winston.error(err.message, {metatada: err});
    res.status(500).send(err.message);
    next();
}