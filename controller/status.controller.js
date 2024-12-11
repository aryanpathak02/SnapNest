
const wrapAsync = require('../utlies/wrapAsync');
const ExpressError = require('../utlies/ExpressError');
const Status = require('../models/status.model');

module.exports.renderingStory = (req,res)=>{
    res.render('./Story/addNewStory');
}

module.exports.savingStatus = wrapAsync(async(req,res)=>{
    if(!req.file){
        res.flash('error','Something wrong happened while uploading story.');
        throw new ExpressError('500','Something wrong happened while uploading story.');
    }
     const userId = req.user._id;
     await Status.create({
        user : userId,
        photo : {
            filename : req.file.filename,
            path : req.file.path
        }
     });

    //  console.log(newstatus);
     req.flash('success','Status added successfully');
     res.redirect('/post/all');
})