const express = require('express');
const router = express.Router();
const { upload} = require("../config/cloudconfig");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require('../middleware/middleware');
const userController = require('../controller/user.controller')

router.get('/signin', userController.renderingSignin);

router.post('/signin', userController.userSigin);

router.get('/signup', userController.renderingSignup);

router.post('/signup', saveRedirectUrl,
    passport.authenticate('local', {
        failureRedirect: '/user/signin',
        failureFlash: true
    }),
    userController.userSignup
   );


router.get('/logout', userController.logout);

router.get('/profile/edit', isLoggedIn, userController.renderingEditPage);

router.put('/profile/edit', upload.single('photo'), userController.editProfile);


router.get('/profile/:username', isLoggedIn, userController.renderingProfilePage);


router.get('/search',isLoggedIn, userController.renderingSearchPage);

router.post('/search',userController.searchUser)

module.exports = router;