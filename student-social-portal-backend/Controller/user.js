
const User = require('../Model/usermodel')
const bcrypt = require('bcrypt')
 const createUser = async (req, res) => {

    try {

        const user = new User(req.body)
      
        const hashpassword = await bcrypt.hash(user.password,10);
        user.password = hashpassword;
        await user.save();
        res.status(201).json({
            success: true,
            message: 'crated user',
            data: user
        });

    } catch (e) {
        console.log(e)
        res.status(400).json({
            message: e.message
        })
    }
};



const getUser = async (req, res) => {

    try{

        const user = await User.findById(req.params.id);
        
        res.status(200).json({message:'success',data:user})


    }catch(e){
        res.status(404).json({message:e.message})
    }

}



module.exports = {getUser,createUser}