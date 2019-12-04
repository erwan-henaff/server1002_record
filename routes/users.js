var express = require('express');
var router = express.Router();

const { getUsers, addUser, getUser, updateUser, deleteUser, authenticateUser, loginUser } = require ('../controllers/usersController');
const auth = require('../middleware/authenticator')
/////////// import validation fonction (express validator)
// const { userValidationRules,userValidationErrorHandling} = require('../validators/validators');

const { validateInputs } = require("../middleware/validators");
const { userValidationRules } = require("../validators/validators");

//////////   get all the records

// router.get('/', getUsers);

///////////// post a new user;

router.post('/', validateInputs(userValidationRules), addUser);

router.route('/').get(auth, getUsers)

// router.route('/').get(getUsers)


// router.post('/', addUser);
 
// router.route('/me').get(auth, authenticateUser);

router.route('/login').post(loginUser);

router
    .route('/:id')
    .get(auth, getUser)
    .delete(auth, deleteUser)
    .put(auth, updateUser)
    




module.exports = router;



