const express = require('express') 

const {createPost,getAllPosts,likesToggle,getProfilePosts,deletePost,addComment,getPostById,updatePost} = require('../Controller/post');

const protect = require('../Middleware/authMiddleware') 
const postUpload = require('../Config/postUpload')

const router = express.Router() ;


router.post('/',protect,postUpload.single('image') ,createPost);
router.get('/',protect,getAllPosts)
router.put('/:id/like',protect,likesToggle);
router.get('/:id/profile',protect,getProfilePosts)
router.delete('/:id',protect,deletePost)
router.put('/:id/comment', protect, addComment)
router.get("/:id", protect,getPostById);
router.put("/update/:id",protect,updatePost)
module.exports = router;