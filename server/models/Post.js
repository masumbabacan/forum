const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type : String, 
        required : true
    },
    content: {
        type : String, 
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false,
    },
    category: [{
        type : mongoose.Types.ObjectId,
        ref : 'Category',
        required : true
    }],
    user: {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model('Post',PostSchema);