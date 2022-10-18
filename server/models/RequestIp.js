const mongoose = require('mongoose');

const RequestIpSchema = new mongoose.Schema({
    ip: {
        type : String, 
    },
    userAgent : {
        type : String, 
    },
    numberOfVisits: {
        type : Number,
        default : 0,
    },
    user: {
        type : mongoose.Types.ObjectId,
        ref : 'User',
    }
},{timestamps : true});

module.exports = mongoose.model('RequestIp',RequestIpSchema);