const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
    comment : {
        type : String, 
        required : true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps : true});

 const Comment = mongoose.model('Comment',commentSchema); 
 module.exports = Comment;