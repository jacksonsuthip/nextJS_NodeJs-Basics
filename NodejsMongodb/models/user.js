const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uName: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    phno: {
        type: Number,
        require: true
    },
    date: {
        type: Date
    },
    password: {
        type: String,
        require: true
    },
    entDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('userTable', userSchema)