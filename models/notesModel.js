const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timeStamps: true,
});




module.exports = mongoose.model("Note", notesSchema);