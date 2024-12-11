const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/middleware');
const savedPostController = require('../controller/savedPost.controller');

router.post('/:postId',isLoggedIn,savedPostController.savingsavedPost);
  

module.exports = router;