const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DirectorisSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    bio: String,
    creatAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('director', DirectorisSchema)