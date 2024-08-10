const mongoose = require('mongoose');

const cardGrades = new mongoose.Schema({
    assignment: {type: mongoose.Schema.ObjectId, ref: "Assignment"},
    timesPracticed: {type: Number, required: true},
    average: {type: Number, required: true},
    completed: {type: Boolean, default: false},

    student: {type: mongoose.Schema.ObjectId, ref: 'User'},
    attempts: [{type: mongoose.Schema.ObjectId, ref: "AttemptGrade"}],
    class: {type: mongoose.Schema.ObjectId, required: true},
    card: {type: mongoose.Schema.ObjectId, required: true}

})

const CardGrade = mongoose.model("Grades", cardGrades);
module.exports = CardGrade;
