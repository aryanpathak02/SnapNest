const express = require('express');
const route = express.Router();
const wrapAsync = require('../utlies/wrapAsync');
const { isLoggedIn } = require('../middleware/middleware');
const {isLike} = require('../controller/like.controller');

route.post('/:postId', isLoggedIn, isLike);

module.exports = route;
