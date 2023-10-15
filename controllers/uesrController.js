const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//register user
const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password, password2 } = await req.body;

    if (!name || !email || !password || !password2) {
        res.status(400).json("Please fil in all fields")
    };

    if (password !== password2) {
        res.status(400).json("Passowrds do not match");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json("User already exists.")
    };

    const newUser = await User.create({ name, email, password });

    res.json(newUser);
});


//login user

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = await req.body;

    if (!email || !password) {
        res.status(400).json("Please fil in all fields")
    };

    const user = await User.findOne({ email });

    if(!user) {
        res.status(401).json("Invalid email or password")
    };

    const hashedPassword = bcrypt.hash(password)

    const isValidPassword = bcrypt.compare(password, hashedPassword);

    if(!isValidPassword) {
        res.status(401).json("Invalid password")
    } else {
        res.json("Login successful");
    }

});

module.exports = { registerUser, loginUser };