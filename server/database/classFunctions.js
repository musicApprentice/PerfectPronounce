const {createMetricsForStudent, findAssignmentsByClassID} = require('../database/assignmentFunctions')
const Class = require('../models/classSchema');
const { MongoClient} = require('mongodb');
const connectionString = "mongodb+srv://mkandeshwarath:i0ZlJmFjH5yGRFmF@languagemaestro.uks1z9z.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMaestro";
const client = new MongoClient(connectionString);
var mongoose = require('mongoose');
let db;

async function accessDB (req,res) {
    try{
    await client.connect();
    db = client.db("test")
    }
    catch(err){
        res.status(500).json({ message: err.message });
        console.log("classes have no contents")
    }
}

async function findAllTheClass(req,res){
    const classes = await Class.find() 
    res.json(classes);
}
async function create_new_class(req,res){
    const newClass = new Class({
        className: req.body.className,
        language: req.body.language,
        school : req.body.school,
        courseNumber : req.body.courseNumber,
        assignments : req.body.assignments,
        students : req.body.students,
        teachers : req.body.teachers,
        admins: req.body.admins
    });
    try {
        await newClass.save()
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new Class")
    }
}
// One you delete a class, you have to delete all the flashcards of that class and the class ifself in the
//relative user's course list
async function delete_class(req,res){
    try {
        const id = new mongoose.Types.ObjectId(req.body._id);
        await accessDB(req,res);
        const col = db.collection("classes")
        const delClass = await col.findOne({ "_id": id});
        if (delClass === null) {
            return res.status(404).json({ message: "Class not found" });
        }
        await col.deleteOne({ _id: id })

        res.json({ message: "Deleted Class" });
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
}

async function addClassToUserCourseList(userEmail, class_ID){
    await accessDB();
    const col = await db.collection("users")
    const temp = await col.find({"email":userEmail}).toArray();
    const courseList = temp[0].courseList;
    if(courseList.some(e => e.equals(class_ID))){
        console.log("the class already in the courseList");
    }
    else{
        courseList.push(class_ID)
        await col.updateOne({"email": userEmail},{$set:{"courseList": courseList}})
    }

}
async function findRole(userEmail){
    await accessDB();
    const col = await db.collection("users");
    const emails = await col.find({"email": userEmail}).toArray();
    return emails[0].role;
}
//add one student to a class, and vice versa
async function addUserToClass (req,res){
    await accessDB();
    const col = await db.collection("classes");
    const userEmail = req.body.userEmail;
    const classID = new mongoose.Types.ObjectId(req.body.classID);
    const role = (await findRole(userEmail)).toLowerCase() + "s";
    const tempClass = await (col.find({"_id" : classID}).toArray())
    var arrOfUsers;
    switch(role){
        case "students" :{
            arrOfUsers = tempClass[0].students
        break;
        }
        case "teachers":{
            arrOfUsers = tempClass[0].teachers
            break;
        }
        case "admins" :{
            arrOfUsers = tempClass[0].admins
            break;
        }
        default:
    }
    if(arrOfUsers.some(e=> e.localeCompare(userEmail) === 0)){
        res.json(`That ${role.substring(0, role.length-1)}  already in the class!`)
    }
    else{
        arrOfUsers.push(userEmail);
        await col.updateOne({"_id": classID}, {$set:{[`${role}`]: arrOfUsers}})
        await addClassToUserCourseList(userEmail,classID);
        const allAssignment = await findAssignmentsByClassID(classID);
        allAssignment.forEach(async (e) =>{
            await createMetricsForStudent(e.assignment,classID, e.card, userEmail)
        })
        res.json("Done")
    }
}
module.exports = {create_new_class, delete_class, findAllTheClass, addUserToClass}
