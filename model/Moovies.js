const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MoovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    director_id: Schema.Types.ObjectId, /* idd */
    imdb_score: Number,
    creatAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('moovie', MoovieSchema)