const User = require('../Model/usermodel');
const bcrypt = require('bcrypt');
const generateToken = require('../tokenGenerate');
const cookieParser = require("cookie-parser");

// const registerUser = async (req, res) => {

//     try {

//         const { fullname, email, password, username, branch } = req.body

       

        
//         res.status(201).json({ message: 'User registered successfully', user,token });

//     } catch (e) {

//         res.status(400).json({
//             message: e.message,

//         })
//     }

// }



const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try{

        
        const user = await User.findOne({email});

      

        const isPasswordMatched = await bcrypt.compare(password,user.password);

          if(!user || !isPasswordMatched){
            return res.status(400).json({
                message: 'Invalid Credentails'
            })
        }
        let token = generateToken(user._id,res);

        res.status(200).json({
            message:"User Logged Successfully",
            data:user,
            token:token
        })

    }catch(e){

        res.status(500).json({
            message : e.message
        })
    }

}






module.exports = { loginUser };