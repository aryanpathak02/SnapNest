const Post = require('../models/post.model');

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/user/signin");
    }
    next();
}

const saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;  
    }
    next();
}

const isOwner = async(req,res,next)=>{
    const {postId} = req.params;
    const post = await Post.findById(postId); 
    if(!post){
        throw new ExpressError('404','Post not found');
    }

    if(!post.user._id.equals(req.user._id)){
        req.flash("error", "You cannot have permission to edit other post");
        return res.redirect(`/post/${post._id}`)
    }
    next();
}


module.exports = {isLoggedIn , saveRedirectUrl ,isOwner};