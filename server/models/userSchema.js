const mongoose = require('mongoose');
//mongoose library interacts with MongoDB

//create userSchema
const userSchema = new mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    school: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
    // Ids of classes user is enrolled into
    courseList: [{type: mongoose.Schema.ObjectId, ref: "Class"}],
    lessons:[{type: mongoose.Schema.ObjectId, ref: "Lesson"}],
    assignments:[{type: mongoose.Schema.ObjectId, ref: "Assignment"}],
    //population in this manner is too complicated for assignments, I will fetch assignments separately using a route where 
    //I filter by the student such that the assignment arrives in the way it should, then I will append the assignments here such 
    //that I have the correct hierarchy and data

})

const User = mongoose.model("User", userSchema);
//User encompasses our model
//It is a wrapper for the schema...
//A schema for allowing us to modify (delete, add, update) documents in the User collection


module.exports = User;