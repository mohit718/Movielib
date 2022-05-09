const config  = require('config');
const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    winston.configure({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logfile.log'}),
            // new winston.transports.MongoDB({db: config.get('db'), options: { useUnifiedTopology: true }})
        ]
    });
    winston.exceptions.handle(new winston.transports.File({filename: 'uncaught.log'}));
    winston.exceptions.handle(new winston.transports.Console());
    // winston.rejections.handle(new winston.transports.File({ filename: 'rejection.log' })); //Not working
    //Walkaround solution below
    process.on('unhandledRejection', (ex)=>{
        throw ex;
    });
    // process.on('uncaughtException', (ex)=>{
    //     winston.error(ex.message, {metadata: ex});
    // });
    // process.on('unhandledRejection', (ex)=>{
    //     winston.error(ex.message, {metadata: ex});
    //     process.exit(1);
    // });
    
   
}