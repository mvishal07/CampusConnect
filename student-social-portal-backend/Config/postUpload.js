const multer = require('multer')

const {CloudinaryStorage} = require('multer-storage-cloudinary')

const cloudinary = require('./cloudinary')

const postStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'student-portal/posts'
    },
});


const postUpload = multer({storage:postStorage})

module.exports = postUpload;