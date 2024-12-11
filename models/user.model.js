const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        unique : true,
        required : true
    },
    bio : {
        type : String
    },
    phone : {
        type : Number,
    },
    photo : {
        filename : String,
        path : {
            type : String, 
            default : 'https://www.svgrepo.com/show/530412/user.svg'
        }
    },
    gender : {
        type : String , 
        enum: ['male','female','other']
    },
    follower : [{type : mongoose.Schema.Types.ObjectId , ref :"User",required : true}],
    following : [{type : mongoose.Schema.Types.ObjectId , ref :"User",required : true}]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

module.exports = User;