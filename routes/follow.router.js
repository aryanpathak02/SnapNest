const express = require('express');
const route = express.Router();
const { isLoggedIn } = require('../middleware/middleware');  
const {checkfollow} = require('../controller/follow.controller');


// Follow/Unfollow route
route.post('/:userId', isLoggedIn,checkfollow);

module.exports = route;
