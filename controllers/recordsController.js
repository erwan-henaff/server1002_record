const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

/////////////////////////
const Record = require ('../models/Records');
const createError = require('http-errors');



exports.getRecords = async (req,res,next) => {
    // const records = db.get('records').value();
    // res.status(200).send(records);

    try {
        const records = await Record.find();
        res.status(200).send(records);
    } catch (error) {
        next();
    }
};

exports.addRecord = async (req,res,next) => {

    try {
        const record = new Record(req.body);
        await record.save();
        res.status(200).send(record);

    } catch (e) {
        next(e);
    } 

    // const record = req.body;
    // db.get('records')
    // .push(record)
    // .last()
    // .assign({ id : Date.now().toString() })
    // .write();

    // res.status(200).send(record);
};

//  record /:id

exports.getRecord = (req,res,next)=> {
    const {id} = req.params;
    const record = db.get('records').find({id:id}).value();
    res.status(200).send(record);
}

exports.deleteRecord = (req,res,next)=> {
    const {id} = req.params;
    const record = db.get('records').remove({id:id}).write();
    res.status(200).send(record);
}

exports.updateRecord = (req,res,next)=> {
    const {id} = req.params;
    const data = req.body;
    const record = db.get('records').find({id:id}).assign(data).write();
    res.status(200).send(record);
}