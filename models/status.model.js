const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    photo: {
        path : {
            type : String,
            required : true
        },
        filename : {
            type : String,
            required : true
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId , ref : 'User',
    }
},{timestamps : true });

const Status = mongoose.model('Status',statusSchema);
module.exports = Status;