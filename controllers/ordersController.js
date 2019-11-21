const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

/////////////////////////
const Order = require ('../models/Orders');
const createError = require('http-errors');

exports.getOrders = async (req,res,next) => {
    // const orders = db.get('orders').value();
    // res.status(200).send(orders);

    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        next();
    }
};

exports.addOrder = async (req,res,next) => {

    try {
        const order = new Order(req.body);
        await order.save();
        res.status(200).send(order);

    } catch (e) {
        next(e);
    } 
    // const order = req.body;
    // db.get('orders')
    // .push(order)
    // .last()
    // .assign({ id : Date.now().toString() })
    // .write();

    // res.status(200).send(order);
};

exports.getOrder = (req,res,next) => {
    const {id} = req.params;
    const order = db.get('orders').find({id:id}).value()

    res.status(200).send(order)
}

exports.deleteOrder = (req,res,next) => {
    const {id} = req.params;
    const order = db.get('orders').remove({id:id}).write();

    res.status(200).send(order);
}

exports.updateOrder = (req,res,next) => {
    const {id} = req.params;
    const data = req.body;
    const order = db.get('orders').find({id}).assign(data).write();

    res.status(200).send(order);
}