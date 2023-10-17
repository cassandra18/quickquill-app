const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWTSECRETKEY, { expiresIN: '30d' })
};

//register user
const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password, password2 } = await req.body;

    if (!name || !email || !password || !password2) {
        res.status(400)
        throw new Error("Please fil in all fields")
    };

    if (password !== password2) {
        res.status(400)
        throw new Error("Passowrds do not match");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error("User already exists.")
    };

    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({ name, email, password: hashedPassword });


    if (newUser) {
        res.status(200).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id),
        });
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
});


//login user

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = await req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error("Please fil in all fields")
    };

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    };
    

});

module.exports = { registerUser, loginUser };