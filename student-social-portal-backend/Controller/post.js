const Post = require('../Model/postmodel')

const createPost = async (req, res) => {

    try {

        const { caption } = req.body;
        const postImgUrl = req.file ? req.file.path : ""

        // if (!caption || !postImgUrl) {
        //     return res.status(400).json({ message: 'Content is required' })
        // }

        const post = new Post({
            user: req.userId,
            caption,
            image: postImgUrl
        })

        await post.save();
        res.status(201).json({
            success: true,
            message: 'Post created Successfully',
            data: post
        })

    } catch (e) {
        res.status(400).json({ message: e.message })
    }

}



const getAllPosts = async (req, res) => {



    try {

        const posts = await Post.find()
            .sort({ createaAt: -1 })
            .populate("user", "fullname username profileImage branch bio")
            .populate("comments.user", "fullname username profileImage");

        res.status(200).json(posts);

    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}

const getProfilePosts = async (req, res) => {
    try {
        const userId = req.params.id
        const allPosts = await Post.find({ user: userId }).populate("user", "fullname username profileImage branch bio").sort({ createdAt: -1 })

        if (!allPosts || allPosts.length === 0) {
            return res.status(404).json({
                message: "No posts found for this user",
            });
        }
        res.status(200).json(allPosts)




    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const updatePost = async (req, res) => {
  try {
    const { caption } = req.body;
    const postId = req.params.id;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { caption },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { updatePost };


const deletePost = async(req,res)=>{

    try{

        const deleted = await Post.findByIdAndDelete(req.params.id)

        if(!deleted){
            return res.status(404).json({
                message: 'Unable to Delete Post'
            })
        }
        res.status(200).json({
            message:'Deleted successfully',
            deleted
        })

    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }
}


const likesToggle = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Invalid post'
            })
        }

        const userId = req.userId;

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId)
        }

        await post.save()
        res.status(200).json({ message: "Like updated", likes: post.likes })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}



const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "fullname username profileImage branch bio")
      .populate("comments.user", "fullname username profileImage");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = { user: req.userId, text };
    post.comments.push(comment);

    await post.save();

  
    const updatedPost = await Post.findById(req.params.id)
      .populate("comments.user", "fullname username profileImage");

    res.status(201).json({ 
      message: "Comment added", 
      comments: updatedPost.comments 
    });

  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = { createPost, getAllPosts, likesToggle, getProfilePosts ,deletePost,addComment,getPostById,updatePost};