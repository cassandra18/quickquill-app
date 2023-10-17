const path =  require('path');
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 4000
connectDB()


const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/notes", require("./routes/notesRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port} `)
});