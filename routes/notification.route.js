const express = require('express');
const route = express.Router();
const {isLoggedIn} = require('../middleware/middleware');
const {showNotification} = require('../controller/notification.controller')

route.get('/',isLoggedIn,showNotification);


module.exports = route;