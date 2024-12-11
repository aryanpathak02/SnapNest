const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/middleware');
const {saveComment} = require('../controller/comment.controller');

router.post('/:postId', isLoggedIn,saveComment);

module.exports = router;