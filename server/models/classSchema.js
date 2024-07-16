const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: { type: String, required: true },
    courseNumber: { type: String, required: true },
    school: { type: String, required: true },
    language: { type: String, required: true },
    students: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    teachers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  });

const Class = mongoose.model("Class", classSchema);
module.exports = Class;


