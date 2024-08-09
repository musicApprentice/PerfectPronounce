
const mongoose = require('mongoose')
const lessonSchema = new mongoose.Schema({
    name: {type: String, required: true},
    
    flashcards: [{type: mongoose.Schema.ObjectId, ref: "Flashcard"}],
    class: {type: mongoose.Schema.ObjectId, ref: "Class"},

})

const Lesson = mongoose.model("Lesson", lessonSchema)

module.exports = Lesson