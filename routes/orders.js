const express = require('express');
const router = express.Router();
const { getOrders, addOrder, getOrder, deleteOrder, updateOrder } = require ('../controllers/ordersController');

//////////   get all the records

router.get('/', getOrders);

///////////// post a new record

router.post('/', addOrder);

// router
//     .route('/:id')
//     .get(getOrders)
//     .post(addOrder)

router
    .route('/:id')
    .get(getOrder)
    .delete(deleteOrder)
    .put(updateOrder)

module.exports = router;