const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema ({
    date: {
        type: Date,
        default: Date.now
    },
    records : [ recordId :{
        type: String,
        required: true
    }],
    userId : {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);