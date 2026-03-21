const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller.js');
const multer = require('multer');
const identifyUser = require('../middlewares/auth.middleware.js');
const upload = multer({storage: multer.memoryStorage()})





// create post route
postRouter.post('/', upload.single('image') , identifyUser , postController.createPostController);




// get all posts route
postRouter.get('/', identifyUser, postController.getPostController);




// get post details route
postRouter.get('/details/:postId', identifyUser, postController.getPostDetailsController);




// like post route
postRouter.post('/like/:postId', identifyUser, postController.likePostController);



// unlike post route
postRouter.delete('/unlike/:postId', identifyUser, postController.unlikePostController);




// Get feed route
postRouter.get('/feed', identifyUser, postController.getFeedController);







module.exports = postRouter;