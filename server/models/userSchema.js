const mongoose = require('mongoose');
//mongoose library interacts with MongoDB

//create userSchema
const userSchema = new mongoose.Schema({
    // Instead of a field with user type, just insert the users into the correct type collection
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    school: {type: String, required: true},
    state: {type: String, required: true},
    // Ids of classes user is enrolled into
    courseList: [{type: mongoose.Schema.ObjectId}]
})

const User = mongoose.model("User", userSchema);
//User encompasses our model
//It is a wrapper for the schema...
//A schema for allowing us to modify (delete, add, update) documents in the User collection


module.exports = User;