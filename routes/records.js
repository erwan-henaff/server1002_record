const express = require('express');
const router = express.Router();
const { getRecords, addRecord, getRecord, deleteRecord, updateRecord} = require ('../controllers/recordsController');

//////////   get all the records

router.get('/', getRecords);

///////////// post a new record

router.post('/', addRecord);

// router.
//     .route('/')
//     .get(getRecords)
//     .post(addRecord)



router
    .route('/:id')
    .get(getRecord)
    .delete(deleteRecord);

router
    .route('/:id')
    .get(getRecord)
    .put(updateRecord);

module.exports = router;