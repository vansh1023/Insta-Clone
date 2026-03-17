const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes.js');
const postRouter = require('./routes/post.routes.js');

const app = express();



// Middlewares
app.use(express.json());
app.use(cookieParser());



// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);


















module.exports = app;