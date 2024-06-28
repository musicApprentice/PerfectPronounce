const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {type: String, required: true},
    language: {type: String, required: true},
    id :{type: String, required: true, unique: true},
    assignments:{type: Object, required: true},
    metrics :{type: Object, require : true},
    students:{type: Object, require: true},
    teachers:{type: Object, require: true},
})

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
