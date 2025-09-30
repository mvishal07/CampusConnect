const jwt = require('jsonwebtoken') 


const generateToken = (userId,res)=>{

    const token =  jwt.sign({ id: userId },process.env.JWT_SECRET,{
        expiresIn:"1d",
    });

    res.cookie("mytoken",token,{
        maxAge:  1000 * 60 * 60 * 24, 
        httpOnly:true,

    });

    return token;
}

module.exports = generateToken;