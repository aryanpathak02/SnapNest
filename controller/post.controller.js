const Post = require('../models/post.model');
const Status = require('../models/status.model');
const ExpressError = require('../utlies/ExpressError');
const wrapAsync = require('../utlies/wrapAsync');
const formatTimeAgo = require('../utlies/getTimeAgo');


module.exports.renderingAllPost = wrapAsync(async (req, res) => {

    const posts = await Post.find()
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    posts.forEach(post => {
        post.formattedCreatedAt = formatTimeAgo(post.createdAt);

        post.comments.forEach(comment => {
            comment.formattedCreatedAt = formatTimeAgo(comment.createdAt);
        });
    });

    let statuses = await Status.find({ user: { $in: [...req.user.following, req.user._id] } }).populate({ path: 'user', select: 'username photo' }).select('createdAt photo.path ');
    statuses.forEach(status => {
        status.formattedCreatedAt = formatTimeAgo(status.createdAt)
    });
    res.render('./post/allPost', { posts, statuses });
});

module.exports.renderingCreatePost = (req, res) => {
    res.render('./post/addNewPost');
}

module.exports.creatingPost = wrapAsync( async (req, res) => {
    if (!req.file) {
        throw new ExpressError(400, "Photo is required for the post.");
    }

    const { description = null, city = null } = req.body;

    const postData = {
        photo: {
            filename: req.file.filename,
            path: req.file.path,
        },
        description,
        city,
        user: req.user._id,
    };

    await Post.create(postData);
    req.flash('success', `New Post Uploaded Successfully.`);
    res.redirect('/post/all');
})

module.exports.renderingSinglePost =  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate({
        path:'comments',         
        populate: {
            path: 'user',        
            select: 'username photo' 
        }
    }).populate('user').lean();
    post.timeAgo = formatTimeAgo(post.createdAt);

    // Format each comment's `createdAt`
    post.comments = post.comments.map((comment) => ({
      ...comment,
      timeAgo: formatTimeAgo(comment.createdAt),
    }));
    res.render('./post/singlePost', { post });
})

module.exports.renderingEditPost = wrapAsync(async(req,res)=>{
    const {postId} = req.params;
    const post = await Post.findById(postId);
    if(!post){
        throw new ExpressError('404','Post not found');
    }
    res.render('./post/editPost',{post});
})

module.exports.editPost = wrapAsync(async(req,res)=>{
    const {postId} = req.params;
    const {description , city} = req.body;
   //   console.log(req.body);
    const post = await Post.findById(postId);

    if(description && post.description !== description){
       post.description = description;
    }else if(city && post.city !== city){
       post.city = city;
    }

   let editedPost = await post.save();
   // console.log(editedPost);
   req.flash('success','Post has been updated Successfully.');
   res.redirect(`/post/${postId}`);
})

module.exports.deletePost = async(req,res)=>{
    const {postId} = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if(!post){
     throw new ExpressError('404','Not post found to delete');
    }
 
 //    console.log(post);
    req.flash('success','Post has been deleted successfully');
    res.redirect('/post/all');
 }