const Class = require('../models/classSchema');
const { MongoClient} = require('mongodb');
const connectionString = "mongodb+srv://mkandeshwarath:i0ZlJmFjH5yGRFmF@languagemaestro.uks1z9z.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMaestro";
const client = new MongoClient(connectionString);
var mongoose = require('mongoose');
let db;

async function access_course_test (req,res) {
    try{
    await client.connect();
    db = client.db("CoursesTest")
    }
    catch(err){
        res.status(500).json({ message: err.message });
        console.log("classes have no contents")
    }
}
async function access_users_database(req,res){
    try{
        await client.connect();
        db = client.db("test")
    }catch(err){
        console.log(err.message)
    }
}
async function findAllTheClass(req,res){
    await access_course_test(req,res);
    const col = await db.collection("classes")
    const classes = await col.find().toArray();
    res.json(classes);
}
async function create_new_class(req,res){
    try {
        const newClass = new Class({
            name: req.body.name,
            language: req.body.language,
            assignments : req.body.assignments,
            students : req.body.student,
            teachers : req.body.teacher
        });
        await access_course_test(req,res);
        const col = await db.collection("classes");
        col.insertOne(newClass);
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
        await access_course_test(req,res);
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
async function addFlashcard(req,res){
    try{
        await access_course_test(req,res);
        const flashcard_ID = new mongoose.Types.ObjectId(req.body.card_ID);
        const class_ID = new mongoose.Types.ObjectId(req.body.classID)
        const col1 = await db.collection("classes");
        const arrOfFlashCardOfClass = (await col1.find({"_id": class_ID}).toArray())[0].assignments;
        if(arrOfFlashCardOfClass.some(e => e._id.equals(flashcard_ID))){
            res.json("Flashcard already in the class")
        }
        else{
        arrOfFlashCardOfClass.push(flashcard_ID);
        await col1.updateOne({"_id": class_ID}, {$set:{"assignments": arrOfFlashCardOfClass}})
        res.json("Successfully")
    }
    }
    catch(err){
        res.json(err.message)
    }    
}
async function addClassToStudentCourseList(student, class_ID,res, next){
    await access_users_database();
    const col = await db.collection("users")
    const temp = await col.find({"_id":student}).toArray();
    const courseList = temp[0].courseList;
    if(courseList.some(e => e.equals(class_ID))){
        console.log("the class already in the courseList");
    }
    else{
        courseList.push(class_ID)
        await col.updateOne({"_id": student},{$set:{"courseList": courseList}})
    }

}
//add one student to a class, and vice versa
async function addStudentToClass (req,res){
    await access_course_test();
    const col = await db.collection("classes");
    const student = new mongoose.Types.ObjectId (req.body.student_ID);
    const classID = new mongoose.Types.ObjectId(req.body.class_ID);
    const temp = await (col.find({"_id" : classID}).toArray())
    const arrOfStudents = temp[0].students;
    if(arrOfStudents.some(e=> e.equals(student))){
        console.log("That student already in the class!")
    }
    else{
        arrOfStudents.push(student);
        await col.updateOne({"_id": classID}, {$set:{"students": arrOfStudents}})
        await addClassToStudentCourseList(student,classID,res);
        res.json("Done")
    }
}
module.exports = {create_new_class, delete_class, findAllTheClass, addFlashcard, addStudentToClass}
