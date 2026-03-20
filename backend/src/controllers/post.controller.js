const postModel = require('../models/post.model.js');
const ImageKit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs');
const identifyUser = require('../middlewares/auth.middleware.js');
const likeModel = require('../models/like.model.js');



// Imagekit cloud staorage set-up
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});




// Create post controller
async function createPostController (req, res) {


  const {caption} = req.body;


  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'Test',
    folder: "cohort-2-insta-clone-posts"
  });


  const post = await postModel.create({
    caption,
    imageUrl: file.url,
    user: req.user.id
  })

  res.status(201).json({
    message: "post created successfully"
  })

}




// Get post controller
async function getPostController (req, res) {

  const userID = req.user.id;

  const posts = await postModel.find({user: userID})

  res.status(200).json({
    message: "posts fetched successfully",
    posts
  })


}




// Get post details controller
async function getPostDetailsController (req, res) {

  const userID = req.user.id;

  const {postId} = req.params;

  const post = await postModel.findById(postId);

  if(!post){
    res.status(404).json({
      message: "post not found"
    })
  }

  const isValidUser = (post.user.toString() === userID);

  if(!isValidUser){
    res.status(403).json({
      message: "forbidden content"
    })
  }

  res.status(200).json({
    message: "post fetched successfully",
    post
  })



}






// like post controller
async function likePostController (req, res) {

  const postId = req.params.postId;
  const user = req.user.id;

  const post = await postModel.findById(postId);

  if(!post){
    return res.status(404).json({
      message: "post not found"
    })
  }

  const like = await likeModel.create({
    post: postId,
    user
  })

  res.status(200).json({
    message: "post liked successfully",
    like
  })
  
}






// Get feed controller
async function getFeedController (req, res) {
  const posts = await postModel.find().populate("user", "-password")


  res.status(200).json({
    message: "posts fetched successfully",
    posts
  })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
}