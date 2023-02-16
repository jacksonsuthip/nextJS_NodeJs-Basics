const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    uName: {
        type: String,
        require: true
    },
    sysIP: {
        type: String
    },
    loginDateTime: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('loginTable', loginSchema)