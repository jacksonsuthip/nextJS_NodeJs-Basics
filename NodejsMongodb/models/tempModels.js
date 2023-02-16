const mongoose = require('mongoose')

const tempSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phno: {
        type: Number,
        required: true
    },
    entDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('table_test', tempSchema)