var express = require('express');
var router = express.Router();

const { getUsers, addUser, getUser, updateUser, deleteUser } = require ('../controllers/usersController');


//////////   get all the records

router.get('/', getUsers);

///////////// post a new record

router.post('/', addUser);

router
    .route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)
    

module.exports = router;



