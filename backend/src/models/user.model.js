const mongoose = require('mongoose');

const usereSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "email already exists"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/pg9aoqljd/avatar-user-image.jpeg"
    }
})


const userModel = mongoose.model("users", usereSchema);

module.exports = userModel;