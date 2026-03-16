const mongoose = require('mongoose');


// Database connection function
async function connectToDB(){
    await mongoose.connect(`${process.env.MONGO_URI}/Insta-Clone-DB`);
    console.log('Connected to DB');
}





module.exports = connectToDB;