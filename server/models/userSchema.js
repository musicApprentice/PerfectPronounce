const mongoose = require('mongoose');
//mongoose library interacts with MongoDB

//create userSchema
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    school: {type: String, required: true},
    role: {type: String, required: true},

})

const User = mongoose.model("User", userSchema);
//User encompasses our model
//It is a wrapper for the schema...
//A schema for allowing us to modify (delete, add, update) documents in the User collection


module.exports = User;