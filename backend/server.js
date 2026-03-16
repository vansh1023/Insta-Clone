require('dotenv').config();
const app = require('./src/app.js');
const connectToDB = require('./src/config/database.js')



// Connected to Database
connectToDB();


app.listen(3000, () => {
    console.log("Server is running on Port 3000");
})