const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');




// Creating server instance
const app = express();



// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))





// Requiring Routes
const authRouter = require('./routes/auth.routes.js');
const postRouter = require('./routes/post.routes.js');
const userRouter = require('./routes/user.routes.js');




// Access Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);










module.exports = app;