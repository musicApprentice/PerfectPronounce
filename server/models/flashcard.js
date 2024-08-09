const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
  
    term: {type: String, require: true},
    translation:{type: String, require: true},
    audio:{type: String},
})

const FlashCard = mongoose.model("Flashcard", flashCardSchema);
module.exports = FlashCard;
