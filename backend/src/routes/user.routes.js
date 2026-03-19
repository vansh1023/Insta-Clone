const express = require('express');
const userController = require('../controllers/user.controller.js')
const identifyUser = require('../middlewares/auth.middleware.js');



// Creating user Router
const userRouter = express.Router();




// User follow API route
userRouter.post('/follow/:userId',identifyUser, userController.followUserController);




// User unfollow API route
userRouter.post('/unfollow/:userId', identifyUser, userController.unfollowUserController);





// Get follow pending requests
userRouter.get('/follow/requests', identifyUser, userController.getPendingRequestsController);





// accept follow request
userRouter.patch('/follow/accept/:requestId', identifyUser, userController.acceptRequestController);






// reject follow request
userRouter.patch('/follow/reject/:requestId', identifyUser, userController.rejectRequestController);








module.exports = userRouter;