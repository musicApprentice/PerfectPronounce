const mongoose = require('mongoose');
//mongoose library interacts with MongoDB

//create userSchema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true, unique: true}
})

const User = mongoose.model("User", userSchema);
//User encompasses our model
//It is a wrapper for the schema...
//A schema for allowing us to modify (delete, add, update) documents in the User collection


module.exports = User;