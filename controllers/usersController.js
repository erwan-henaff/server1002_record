// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('data/db.json');
// const db = low(adapter);

/////////////////////////
const User = require ('../models/Users');
const createError = require('http-errors');



exports.getUsers = async (req,res,next) => {
    // // lowdb code
    // const users = db.get('users').value();
    // const numbUsers = db.get('users').size().value();
    // const allNameUsers = db.get('users').map('first name').value();
    // res.status(200).send({users,numbUsers,allNameUsers});

    try {
        const users = await User
        .find()
        .select('-password -__v -tokens._id')
        .sort('lastName');
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
};

exports.addUser = async (req,res,next) => {

    try {
        const user = new User(req.body);
        const token = user.generateAuthToken();
        await user.save();
        const data = user.getPublicFields();
        res
            .status(200)
            .header('x-auth', token)
            .send(data);
    } catch (e) {
        next(e);
    } 

    // const user = req.body;
    // db.get('users')
    // .push(user)
    // .last()
    // .assign({ id : Date.now().toString() })
    // .write();
    // res.status(200).send(user);
};

exports.getUser = async (req,res,next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password -__v');
        if(!user) throw new createError.NotFound();
        res.status(200).send(user);

    } catch (e) {
        next();
    } 

    // const {id} = req.params;
    // const user = db
    //                 .get('users')
    //                 .find({id:id})
    //                 .value();
    // res.status(200).send(user);
}

exports.deleteUser = async (req,res,next) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id).select('-password');
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (e) {
        next(e);
    }
    // const {id} = req.params;
    // const user = db.get('users').remove({id:id}).write()
    // res.status(200).send(user);
}

exports.updateUser = async (req,res,next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if (!user) throw new createError.NotFound();
        const data = user.getPublicFields();
        res.status(200).send(data);

    } catch (e) {
        next(e);
    }
    // // lowdb code
    // const {id} = req.params;
    // const data = req.body;
    // const user = db.get('users').find({id:id}).assign(data).write();
    // res.status(200).send(user)
}

exports.authenticateUser = async (req, res, next) => {
    res.status(200).send(req.user);

    // try {
    //   const token = req.header('x-auth');
    //   const user = await User.findByToken(token);
    //   if (!user) throw new createError.NotFound();
  
    //   res.status(200).send(user);
    // } catch (e) {
    //   next(e);
    // }
};