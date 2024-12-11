const User = require('../models/user.model'); 
const Notification = require('../models/notification.model');  
const ExpressError = require('../utlies/ExpressError');  
const wrapAsync = require('../utlies/wrapAsync');


module.exports.checkfollow = wrapAsync(async (req, res) => {
    const { userId } = req.params;  // Get userId from URL
    const currentUserId = req.user._id;  // Get current user's ID from session
  
    if (!userId) {
      throw new ExpressError(404, 'User ID is required');
    }
  
    // If the user tries to follow themselves
    if (userId === currentUserId.toString()) {
      throw new ExpressError(400, 'You cannot follow yourself');
    }
  
    // Find the user to follow/unfollow
    const user = await User.findById(userId);
    if (!user) {
      throw new ExpressError(404, 'User not found');
    }
  
    try {
      // Check if the current user is already following the target user
      const isFollowing = user.follower.includes(currentUserId);
  
      if (isFollowing) {
        // Unfollow the user
        await User.findByIdAndUpdate(currentUserId, { $pull: { following: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { follower: currentUserId } });
        console.log('You unfollowed the user');
        req.flash('success', `You unfollowed ${user.username}`);
      } else {
        // Follow the user
        await User.findByIdAndUpdate(currentUserId, { $push: { following: userId } });
        await User.findByIdAndUpdate(userId, { $push: { follower: currentUserId } });
        console.log('You followed the user');
  
        // Create a notification for the target user
        await Notification.create({
          type: 'follow',
          message: `${req.user.username} started following you.`,
          toUser: user._id,
          fromUser: req.user._id,
        });
  
        req.flash('success', `You followed ${user.username}`);
      }
  
      return res.redirect(`/user/profile/${user.username}`);
    } catch (err) {
      console.error('Error while following/unfollowing user:', err.message);
      throw new ExpressError(500, 'Something went wrong while following the user');
    }
  });