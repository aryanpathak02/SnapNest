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


To delete associated notifications and comments when a post is deleted, you can modify your postSchema.post('findOneAndDelete') hook as follows:

Delete comments: When the post is deleted, you can also delete all comments that reference that post.
Delete notifications: Similarly, you can delete notifications related to that post.
Here's how you can implement it:

javascript
Copy code
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

