const express = require('express');
const router = express.Router();
const { getRecords, addRecord, getRecord, deleteRecord, updateRecord} = require ('../controllers/recordsController');
const auth = require('../middleware/authenticator');
//////////   get all the records

router.get('/', getRecords);

///////////// post a new record

router.route('/').post(auth, addRecord);

// router.
//     .route('/')
//     .get(getRecords)
//     .post(addRecord)



router
    .route('/:id')
    .get(getRecord)
    .delete(auth, deleteRecord);

router
    .route('/:id')
    .get(getRecord)
    .put(auth, updateRecord);

module.exports = router;