const express = require('express');
const route = express.Router();
const { upload } = require("../config/cloudconfig");
const { isLoggedIn } = require('../middleware/middleware');
const storyController = require('../controller/status.controller');

route.get('/save',isLoggedIn,storyController.renderingStory);

route.post('/save',isLoggedIn, upload.single('photo'),storyController.savingStatus);

module.exports = route;