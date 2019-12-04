const User = require('../models/Users');
const createError = require('http-errors');

const auth = async(req,res,next) => {
    try {
        const token = req.header('x-auth');
        console.log(token);
        const user = await User.findByToken(token);
        if(!user) throw new createError.NotFound("muri desu");

        req.user = user;
        next();
    
    } catch (err) {
        next(err);
    }
      
} 

module.exports = auth;