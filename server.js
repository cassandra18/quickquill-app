const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 4000

const axios = require("axios");

connectDB()
app.use(express.json());
app.use("/notes", require("./routes/notesRoutes"));
app.use("/users", require("./routes/userRoutes"));





app.listen(port, () => {
    console.log(`Server running on port ${port} `)
});