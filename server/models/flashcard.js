const mongoose = require('mongoose');

const flashCardSchema = new mongoose.Schema({
    // I'm thinking an assignment collection with all the loose flashcards from every class and assignment
    // Then when we need all the flashcards from one particular assignment in one particular class we just
    // find({classId: cId, assignment: assignment});
    // class object id
    class_ID: {type: mongoose.Schema.ObjectId, required: true},
    // name of assignment
    assignment: {type: String, required: true},
    // flashcard term/text to be practiced, should be unique within each assignment
    card: {type: Number, required: true},
    translation:{type: String, require: true},
    audio:{type: String, require: true},
})

const FlashCard = mongoose.model("flashcard", flashCardSchema);
module.exports = FlashCard;
