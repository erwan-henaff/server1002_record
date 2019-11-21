const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema ({
    date: {
        type: Date,
        default: Date.now
    },
    records : [{
        type: String,
        required: true
    }],
    userId_order : {
        type: String,
        required: true,
        parse: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);

