const mongoose = require('mongoose');
const { Schema } = mongoose;
const Comment = require('../models/comments.modle');
const Notification = require('../models/notification.model');

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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    savedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true,
});

postSchema.post('findOneAndDelete', async (post) => {
   if (!post) return;

   try {
      // Delete all comments associated with the post
      await Comment.deleteMany({ _id: { $in: post.comments } });

      // Delete all notifications related to this post
      await Notification.deleteMany({ post: post._id });

      console.log('Post and associated data (comments, notifications) deleted successfully');
   } catch (err) {
      console.error('Error during post deletion cleanup:', err.message);
   }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
