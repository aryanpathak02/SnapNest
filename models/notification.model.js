const mongoose = require('mongoose');

const notifcationSchema = new mongoose.Schema({
    type : {
        type : String, 
        enum : ['follow','comment','like'],
        required : true
    },
    message :{
        type : String,
        required : true
    },
    toUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    fromUser : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }

},{timestamps : true});

const Notification = mongoose.model('Notification',notifcationSchema);
module.exports = Notification;