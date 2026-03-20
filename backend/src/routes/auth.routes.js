const express = require('express');
const authController = require('../controllers/auth.controller.js');
const identifyUser = require('../middlewares/auth.middleware.js');


const authRouter = express.Router();



// User register API
authRouter.post('/register', authController.registerController);



// User login API
authRouter.post('/login', authController.loginController);





// Fetch logged in user details
authRouter.get('/get-me', identifyUser, authController.getMeController)




module.exports = authRouter;