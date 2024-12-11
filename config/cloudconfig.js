const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,       
    api_key: process.env.CLOUDINARY_API_KEY,            
    api_secret: process.env.CLOUDINARY_SECRET,      
});
process.env.CLOUDINARY_NAME

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'SnapNest',              
        allowed_formats: ['jpeg', 'png', 'jpg'], 
    },
    public_id: (req, file) => {
        return `image_${Date.now()}`;
    },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
