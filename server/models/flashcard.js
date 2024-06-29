const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
    name: {type: String, required: true},
    card: {type: Number, required: true},
    text:{type: String, required: true},
    translation:{type: String, require: true},
    audio:{type: String, require: true},
})

const FlashCard = mongoose.model("assignment", flashCardSchema);
module.exports = FlashCard;
