const express = require('express');
const authController = require('../controllers/auth.controller.js');


const authRouter = express.Router();



// User register API
authRouter.post('/register', authController.registerController);



// User login API
authRouter.post('/login', authController.loginController);




module.exports = authRouter;