
const Notification = require('../models/notification.model');
const wrapAsync = require('../utlies/wrapAsync');
const formatTimeAgo = require('../utlies/getTimeAgo');

module.exports.showNotification = wrapAsync(async(req,res)=>{
    const userId = req.user._id;
    const notifications = await Notification.find({toUser : userId}).populate('fromUser').populate('toUser').populate('post');
    
    notifications.forEach(notification =>{
        notification.formattedCreatedAt = formatTimeAgo(notification.createdAt)
    })

    res.render('./notification/showNotification',{notifications});
})