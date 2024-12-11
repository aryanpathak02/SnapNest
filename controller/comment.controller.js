const Post = require('../models/post.model');
const wrapAsync = require('../utlies/wrapAsync');
const Notification = require('../models/notification.model');
const Comment = require('../models/comments.modle');


module.exports.saveComment =  wrapAsync(async (req, res) => {
    const {postId} = req.params;
    const {comment} = req.body;
    if (!comment || !postId) {
        throw new ExpressError(400, "comment or postId  is missing.");
    }

    const post = await Post.findById(postId);

    if(!post){
        throw new ExpressError(404, "Post not found");
    }
    
    const newComment = await Comment.create({
        comment : comment,
        user : req.user._id
    });

    post.comments.push(newComment);
    await post.save();
    if (!req.user._id.equals(post.user._id)) {
        await Notification.create({
            type: 'comment',
            message: `${req.user.username} has commented on  your post`,
            toUser: post.user._id,  
            fromUser: req.user._id,
            post:postId
        });
    }
    req.flash('success', 'Your comment added successfully');
    res.redirect('/post/all');

});