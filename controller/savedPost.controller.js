const wrapAsync = require('../utlies/wrapAsync');
const Post = require('../models/post.model');


module.exports.savingsavedPost = wrapAsync(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
  
    // Validate that postId and userId are provided
    if (!postId || !userId) {
      return res.status(400).json({ message: "postId and userId are required" });
    }

    const post  = await Post.findById(postId);

    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }
  
    try {

      const index = post.savedPosts.indexOf(userId);

      if(index!== -1){
        post.savedPosts.splice(index,1);
        await post.save();
        return res.status(201).json({message : 'Post has been removed',isSaved : false});
      }else{
        post.savedPosts.push(userId);
        await post.save();
      return res.status(201).json({message : 'Post has been saved' , isSaved : true});
      }

      
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });