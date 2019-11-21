const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

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
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        next();
    }
};

exports.addUser = async (req,res,next) => {

    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user);
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
        const user = await User.findById(id);
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
        const user = await User.findByIdAndDelete(req.params.id);
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
        res.status(200).send(user);

    } catch (e) {
        next(e);
    }
    // // lowdb code
    // const {id} = req.params;
    // const data = req.body;
    // const user = db.get('users').find({id:id}).assign(data).write();
    // res.status(200).send(user)
}