const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
);


const postSchemaRules = {

    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true
    },

    caption: {
        type: String, required: true
    },

    image: {
        type: String
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "UserModel"
    }],

    comments: [commentsSchema],
 createaAt: { type: Date, default: Date.now() }
}






const postSchema = new mongoose.Schema(postSchemaRules);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

