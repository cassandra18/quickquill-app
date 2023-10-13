const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        tyrpe: String,
        required: true,
    },
    password2: {
        type: String,
        required: true,
        validate: {
            validation: function (value) { // this is the value of the password2 field provided by the user while signing up.
                return (value === this.password);
            },
            message: "Passwords do not match. Please try again."
        },
    },
});


module.exports = mongoose.model("User", UserSchema);