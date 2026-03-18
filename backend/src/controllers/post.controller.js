const postModel = require('../models/post.model.js');
const ImageKit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');



// Imagekit cloud staorage set-up
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});




// Create post controller
async function createPostController (req, res) {

  const {caption} = req.body;

  const {token} = req.cookies;

  if(!token){
    res.status(401).json({
      message: "token not provided, Unauthorized access"
    })
  }

  let decoded = null;
  
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({
      message: "User not authorized"
    })
  }

  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'Test',
    folder: "cohort-2-insta-clone-posts"
  });


  const post = await postModel.create({
    caption,
    imageUrl: file.url,
    user: decoded.id
  })

  res.status(201).json({
    message: "post created successfully"
  })

}




// Get post controller
async function getPostController (req, res) {
  const {token} = req.cookies;

  if(!token){
    res.status(401).json({
      message: "Token not provided, Unauthorized user"
    })
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({
      message: "Token invalid"
    })
  }

  const userID = decoded.id;

  const posts = await postModel.find({user: userID})

  res.status(200).json({
    message: "posts fetched successfully",
    posts
  })


}




// Get post details controller
async function getPostDetailsController (req, res) {
  const {token} = req.body;

  if(!token){
    res.status(401).json({
      message: "Token not provided, Unauthorized user"
    })
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({
      message: "Token invalid"
    })
  }

  const userID = decoded.id;

  const {postId} = req.params;

  const post = await postModel.find({postId});

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



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}