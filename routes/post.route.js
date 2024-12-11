const express = require('express');
const router = express.Router();
const { upload } = require("../config/cloudconfig");
const { isLoggedIn , isOwner} = require('../middleware/middleware');
const  postContorller =  require("../controller/post.controller");

router.get('/all', isLoggedIn,postContorller.renderingAllPost);

router.get('/create', isLoggedIn, postContorller.renderingCreatePost);

router.post('/create',isLoggedIn, upload.single('photo'), postContorller.creatingPost);

router.get('/:id', isLoggedIn, postContorller.renderingSinglePost);

router.get('/:postId/edit',isLoggedIn,isOwner,postContorller.renderingEditPost);

router.put('/:postId',isLoggedIn,isOwner,postContorller.editPost);

router.delete('/:postId',isLoggedIn,isOwner,postContorller.deletePost);

module.exports = router;





