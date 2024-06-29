const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    id: {type: String, required: true},
    flashcards: [{type: mongoose.Schema.ObjectId, ref: 'Flashcard'}],
    metrics: [{type: mongoose.Schema.ObjectId, ref: 'Metrics'}]

})
//

const assignment = mongoose.model("assignment", assignmentSchema);
module.exports = assignment;
