const mongoose = require('mongoose');
// I think we don't need this and should delete it
const assignmentSchema = new mongoose.Schema({
    id: {type: String, required: true},
    flashcards: [{type: mongoose.Schema.ObjectId, ref: 'Flashcard'}],
    metrics: [{type: mongoose.Schema.ObjectId, ref: 'Metrics'}]

})
//

const assignment = mongoose.model("assignment", assignmentSchema);
module.exports = assignment;
