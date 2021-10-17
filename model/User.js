const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserShema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4, 
    },
})

module.exports = mongoose.model('user', UserShema)