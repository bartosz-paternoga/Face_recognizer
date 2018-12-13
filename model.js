const mongoose = require('mongoose');

 
const userSchema = mongoose.Schema({
    Name:{
        type:String,
    },

    Bucket:{
        type:String,
    }


})


const Mong = mongoose.model('Mong', userSchema )

module.exports = { Mong }