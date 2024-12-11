
const ExpressError = require('../utlies/ExpressError');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const {cloudinary } = require("../config/cloudconfig");
const wrapAsync = require('../utlies/wrapAsync');

module.exports.renderingSignin = (req, res) => {
    res.render('./user/signIn.ejs');
}

module.exports.userSigin = wrapAsync(async (req, res) => {
    if (!req.body) {
        throw new ExpressError(400, "there should be name , email , password to saved in db")
    }
    let { name, username, password, email } = req.body;
    const newUser = new User({
        email,
        username,
        name
    });

    const regiterUser = await User.register(newUser, password);

    req.login(regiterUser, (err) => {
        if (err) {
            throw err;
        }
        req.flash('success', `Welcome, ${req.user.username}!`);
        res.redirect('/post/all');
    });
});

module.exports.renderingSignup = (req, res) => {
    res.render('./user/signUp.ejs');
}

module.exports.userSignup =  function (req, res) {
    req.flash('success', `Welcome, ${req.user.username}!`);
    let redirectUrl = res.locals.redirectUrl || '/post/all';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout((err => {
        if (err) {
            throw err;
        }

        req.flash('success', 'You have been logout Successfully');
        res.redirect('/user/signin');
    }));
}

module.exports.renderingEditPage = (req, res) => {
    res.render('./user/editProfilePage', { user: req.user });
}

module.exports.editProfile = wrapAsync(async (req, res) => {
    const { name, email = null, gender = null, bio = null, phone = null } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
        throw new ExpressError(400, 'User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;

    if (req.file) {
        if (user.photo.filename) {
            // Delete the old image using its public_id from Cloudinary
            await cloudinary.uploader.destroy(user.photo.filename);
        }

        // Set new photo details in the user's profile
        user.photo.path = req.file.path;
        user.photo.filename = req.file.filename;
    }

    await user.save();
    req.flash('success', `Profile has been Update Successfully.`);
    res.redirect('/user/profile/edit');
});

module.exports.renderingProfilePage = wrapAsync(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) {
        throw new ExpressError(400, "user not found");
    }
    
    const createdPosts = await Post.find({user : user._id}).select('_id photo');
    const savedPosts = await Post.find({savedPosts : user._id});
    res.render('./user/profilePage', { user, createdPosts,savedPosts});
});

module.exports.renderingSearchPage = wrapAsync(async(req, res) => {
    const posts = await Post.find().select('id photo.path');
    res.render('./user/searchUser',{posts});
});

module.exports.searchUser = async(req,res)=>{
    const {username} = req.body;

    if(!username){
        throw new ExpressError(400,'Username is required');
    }

    const users = await User.find({ 
        username: { $regex: username, $options: 'i' } // 'i' makes it case-insensitive
      }).select('username photo.path');
    
    if(!users.length){
        return res.render('./user/searchUser',{posts : null , users : null, message : "No user found"});
    }  

    return res.render('./user/searchUser',{users , posts : null});
}