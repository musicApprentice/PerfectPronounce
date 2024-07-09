const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {type: String, required: true},
    language: {type: String, required: true},
    id :{type: String, required: true, unique: true},
    // Separate students, teachers, and admin, because it's
    // to look at grades and such, and because I don't think we
    // user type as long as we insert them into the correct collection
    // We definitely need user type if we roll them all into one list, but that complicates things

    // We also can go without these three fields if we want to, just have
    // get them manually later on by finding all the users with the class in their course lists

    // Alternatively, emails work too, instead of object Ids
    students: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    teachers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
   

})

const Class = mongoose.model("Class", classSchema);
module.exports = Class;


