const mongoose = require("mongoose");
const colors = require("colors");
const asyncHandler = require("express-async-handler");


const connectDB = async () => {
    try{
        console.log("Connecting to DataBase...").yellow;

        const connected = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    
        console.log(`Connection to DataBase successful: ${connected.connection.host}`).orange;
    
    } catch (error) {
        console.error(`Unable to connect to MongoDB: ${error.emssage}`).red;
    }


};


module.exports = connectDB;
