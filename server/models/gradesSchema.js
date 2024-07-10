const mongoose = require('mongoose');

const gradesSchema = new mongoose.Schema({
    // Same as flashcards, have one collection with all grades from all classes and get grades per class as needed
    classId: {type: mongoose.Schema.ObjectId, required: true},
    assignment: {type: String, required: true},
    card: {type: String, required: true},
    email: {type: String, required: true},
    timesPracticed: {type: Number, required: true},
    score: {type: Number, required: true}
})

const Grades = mongoose.model("assignment", gradesSchema);
module.exports = Grades;
