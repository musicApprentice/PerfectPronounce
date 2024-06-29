const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {type: String, required: true},
    language: {type: String, required: true},
    id :{type: String, required: true, unique: true},
    assignments:[{type: mongoose.Schema.ObjectId, ref: 'Assignment'}],
    //assignments is an array of assignment objects
    users:[{type: mongoose.Schema.ObjectId, ref: 'User'}],
    //users is an array of users, both teacher and student and admin

})

const Class = mongoose.model("Class", classSchema);
module.exports = Class;


