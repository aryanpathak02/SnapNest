const wrapAsync = require('../utlies/wrapAsync');
const Notification = require('../models/notification.model');
const Post = require('../models/post.model');


module.exports.isLike = wrapAsync(async (req, res) => {
    const userId = req.user._id;
    const {postId} = req.params;
    // console.log('user id ', userId , 'post id' ,postId );

    if(!userId || !postId ){
      return res.status(404).json({message : 'Post id not found'});
    }

    let post = await Post.findById(postId).populate('user');

    if(!post){
      return res.status(404).json({message : 'Post not found please enter right post id'});
    }

    const index = post.likes.indexOf(userId);

    if(index ===  -1){
      post.likes.push(userId);
      await post.save();
      if(!req.user._id.equals(post.user._id)){
        await Notification.create({
            type: `like`,
            message : `${req.user.username} has liked your post`,
            toUser : post.user._id,
            fromUser : req.user._id,
            post : post._id
        });
      }

      res.status(201).json({message : "You liked the post successfully.", "isLiked": true});
    }else{
      post.likes.splice(index,1);
      await post.save();  
      res.status(201).json({message : "You unlike the post successfully.", "isLiked": false});
    }
});