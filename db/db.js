const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://mooves:fYBtX2P8zzg2VZrN@cluster0.fzgk6.mongodb.net/test').then(() => {
        console.log(`Mongo DB Onlayn Ulandik`);
    }).catch((err) => {
        console.log(err);
    })
}


