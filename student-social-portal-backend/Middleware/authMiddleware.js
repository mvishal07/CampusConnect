const jwt = require('jsonwebtoken')



const protect = (req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.userId = decoded.id;

    //           if (!req.userId) {
    //     return res.status(401).json({ message: "Token invalid: userid missing" });
    //   }
      
            return next();
        }catch(error){
            return res.status(401).json({
                message:"Not authorized 1"
            })
        }
        
        
    }
    return res.status(401).json({
        message:"Not Authorized"
    })
}

module.exports  = protect