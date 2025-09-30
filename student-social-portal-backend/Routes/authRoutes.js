const express = require('express');
const bcrypt = require('bcrypt');
const generateToken = require('../tokenGenerate');
const {loginUser} = require('../Controller/auth')
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../Config/cloudinary')
const User = require('../Model/usermodel')

const router = express.Router(); 


const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder :"student-portal/profiles"
    }
});

const upload = multer({storage})


router.post('/sign', upload.single("profileImage"), async(req,res)=>{

    try{

        const {fullname,email,password,username,branch,bio} = req.body;
        
        if (!fullname || !email || !password || !username || !branch) {

            return res.status(400).json({ message: 'All fields are required' })
        };

         const hashpassword = await bcrypt.hash(password, 10);
       

 


        const user = new User({
            fullname,
            email,
            password:hashpassword,
            username,
            branch,
            bio,
            profileImage:req.file ? req.file.path : ""


        })

        await user.save();
        res.status(201).json({
            success:true,
            message:"USer Registred successfully",
            user

        })

              

    }catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
});










router.post('/login',loginUser);

module.exports = router;