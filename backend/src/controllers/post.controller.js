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




module.exports = {
    createPostController
}