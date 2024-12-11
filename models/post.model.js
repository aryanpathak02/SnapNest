const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('../models/comments.modle');


const postSchema = new mongoose.Schema({
    photo: {
        filename: String,
        path: String
    },
    description: {
        type: String
    },
    city: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments : [{
          type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes : [{
          type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    savedPosts : [{
        type: Schema.Types.ObjectId,
        ref: 'User'
  }],
}, {
    timestamps: true,
});

postSchema.post('findOneAndDelete',async (post)=>{
   if(!post)return;

   try {
 

 } catch (err) {
    console.error('Error during post deletion cleanup:', err.message);
 }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

