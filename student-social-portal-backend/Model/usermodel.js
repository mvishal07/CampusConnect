const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchemaRules = {


    fullname: {
        type: String,
        required: true,

    },

    branch: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return v.endsWith("@spechyd.com")
            },
            message: props => `${props.value} must be a valid college email should end with @spechyd.com`
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },

    username:{
        type:String,
        required:true,
        unique:true
        
       
    },
    bio:{
        type:String
    },

    profileImage: { type: String, default: "" },


  createaAt: { type: Date, default: Date.now() }

}



const userSchema = new mongoose.Schema(userSchemaRules);
const User = mongoose.model("UserModel", userSchema);
module.exports = User;