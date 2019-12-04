// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('data/db.json');
// const db = low(adapter);

/////////////////////////
const Order = require ('../models/Orders');
const createError = require('http-errors');

exports.getOrders = async (req,res,next) => {
    // const orders = db.get('orders').value();
    // res.status(200).send(orders);

    try {
        const orders = await Order
            .find()
            .populate('records.record', '-__v')
            .populate('user', 'fullName email')
            .select('-__v');
        res.status(200).send(orders);
    } catch (error) {
        next(error);
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

exports.getOrder = async (req,res,next) => {
    try {
        const order = await Order.findById(req.params.id)
        .populate('records.record')
        .populate('user','userName fullName email');
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);

    // const {id} = req.params;
    // const order = db.get('orders').find({id:id}).value()
    // res.status(200).send(order)
    } catch (err) {
        next(err);
    }

    
}

exports.deleteOrder = async (req,res,next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }

    // const {id} = req.params;
    // const order = db.get('orders').remove({id:id}).write();
    // res.status(200).send(order);
}

exports.updateOrder = async (req,res,next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
    } catch (e) {
        next (e);
    }
    // const {id} = req.params;
    // const data = req.body;
    // const order = db.get('orders').find({id}).assign(data).write();
    // res.status(200).send(order);
}