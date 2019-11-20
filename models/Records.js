const mongoose = require('mongoose');
const {Schema} = mongoose;

const RecordSchema = new Schema ({
    title : {
        type: String,
        required: true
    },
    artist : {
        type: String,
        required: true
    },
    price : {
        type: number,
        required: true
    },
    year: {
        type: Date
    }
});

module.exports = mongoose.model('Record', RecordSchema);