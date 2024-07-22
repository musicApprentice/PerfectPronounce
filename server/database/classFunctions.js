const {createMetricsForStudent, findAssignmentsByClassID} = require('./flashcardFunctions')
const Class = require('../models/classSchema')
const User = require('../models/userSchema')
const FlashCard = require('../models/flashcardSchema')
var mongoose = require('mongoose')



async function findAllTheClass(req,res){
    const classes = await Class.find() 
    res.json(classes);
}
async function create_new_class(req,res){
    const newClass = new Class({
        className: req.body.className,
        language: req.body.language,
        courseNumber : req.body.courseNumber,
        school : req.body.school,
        students : req.body.students? req.body.students : [],
        teachers : req.body.teachers? req.body.teachers: [],
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
        await Class.deleteOne({"_id":id})
        const studentsInThatClass = await (await User.find()).filter(e => e.courseList.some(e1 => e1.equals(id)))
        studentsInThatClass.forEach(async e => {
            const start = e.courseList.indexOf(id)
            e.courseList.splice(start,1)
            await User.updateOne({"email": e.email},{$set:{"courseList": e.courseList}})
        })
        await FlashCard.deleteMany({"class_ID":id})
        res.json("Deleted Class")
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
}

async function addClassToUserCourseList(userEmail, class_ID){
    const temp = await User.find({"email":userEmail});
    const courseList = temp[0].courseList;
    if(courseList.some(e => e.equals(class_ID))){
        console.log("the class already in the courseList");
    }
    else{
        courseList.push(class_ID)
        await User.updateOne({"email": userEmail},{$set:{"courseList": courseList}})
    }

}
async function findRole(userEmail){
    const emails = await User.find({"email": userEmail});
    return emails[0].role;
}
//add one student to a class, and vice versa
async function addUserToClass (req,res){
    const userEmail = req.body.email;
    const user_id = (await User.find({"email" : userEmail}))[0]._id
    const classID = new mongoose.Types.ObjectId(req.body._id);
    const role = (await findRole(userEmail)).toLowerCase() + "s";
    const tempClass = await Class.find({"_id" : classID})
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
    if(arrOfUsers.some(e=> e.equals(user_id))){
        res.json(`That ${role.substring(0, role.length-1)}  already in the class!`)
    }
    else{
        arrOfUsers.push(user_id);
        await Class.updateOne({"_id": classID}, {$set:{[`${role}`]: arrOfUsers}})
        await addClassToUserCourseList(userEmail,classID);
        const allAssignment = await findAssignmentsByClassID(classID);
        if(role === "students"){
        allAssignment.forEach(async (e) =>{
            await createMetricsForStudent(e.assignment,classID, e.card, userEmail)
        })
    }
        res.json("Done")
    }
}
module.exports = {create_new_class, delete_class, findAllTheClass, addUserToClass}
