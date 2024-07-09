const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://mkandeshwarath:i0ZlJmFjH5yGRFmF@languagemaestro.uks1z9z.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMaestro";
const client = new MongoClient(connectionString);
const Metrics = require('../models/metricsSchema');
const FlashCard = require('../models/flashcard');
var mongoose = require('mongoose');
let db;

async function connectToCoursesDB(){
    await client.connect();
    db = client.db("CoursesTest");
}
async function connectToUsersDB(){
    await client.connect();
    db = client.db("test");
}
async function findAllStudentInClass(classID){
    const col = await db.collection("classes");
    const temp = await col.find({"_id": classID}).toArray();
    const students = temp[0].students;
    return students;
}
// find email of student based on his/her id
async function findEmail(idOfStudent){
    await connectToUsersDB();
    const col = await db.collection("users");
    const temp = (await col.find({"_id": idOfStudent}).toArray());
    const email = temp[0].email
    return email;
}
// create empty metric for each flashcard for each student in a specific class
async function createMetricsForStudent(assignmentName, classID, cardNo){
    try{
        await connectToCoursesDB();
        const students = await findAllStudentInClass(classID)
        const col = await db.collection("metrics")
        students.forEach(async e => {
            const newMetric = new Metrics({
                classId : classID,
                assignment: assignmentName,
                card: cardNo,
                email: await findEmail(e),
                timesPracticed: 0,
                score: 0
            })
            await col.insertOne(newMetric)
        })
    }
    catch(err){
        console.log(err.message);
    }
}
async function findAssignmentsByClassID(class_ID, assignmentName) {
    try {
        await connectToCoursesDB();
        const query = assignmentName 
            ? { $and: [{"class_ID": class_ID}, {"assignment": assignmentName}] } 
            : { "class_ID": class_ID };

        const assignments = await db.collection("flashcards").find(query).toArray();
        return assignments;
    } catch (err) {
        console.log("Cannot access the database");
    } 
}
async function addAssignmentToTheClass(class_ID, newAssignmentID,res){
    await connectToCoursesDB();
    const col = await db.collection("classes")
    const temp = await col.find({"_id": class_ID}).toArray();
    const assClaR = temp[0].assignments;
    if(assClaR.some(e => e.equals(newAssignmentID))){
        console.log("Duplicate assignment")
    }
    else{
        assClaR.push(newAssignmentID);
        await col.updateOne({"_id": class_ID},{$set:{"assignments":assClaR}})
        console.log("Done for add assignment to the class")
    }
}
async function addNewAssignment(req, res){
    try {
        const classID = new mongoose.Types.ObjectId(req.body.class_ID);
        const assignmentsInClass = (await findAssignmentsByClassID(classID, req.body.assignment)).length;
        if(assignmentsInClass === 0){
            const col = await db.collection("flashcards"); 
            const newAssignment = new FlashCard({
                class_ID : classID,
                assignment: req.body.assignment,
                card: 1,
                translation : req.body.translation,
                audio: req.body.audio
            })
            await col.insertOne(newAssignment);
            const temp= await col.find({$and:[{"class_ID":classID},{"assignment": req.body.assignment},{"card": 1}]}).toArray()
            const newAssignment_ID = temp[0]._id;
            await createMetricsForStudent(newAssignment.assignment,classID, newAssignment.card)
            await addAssignmentToTheClass(classID, newAssignment_ID,res)
            res.send("created first one of the new assignment")
        }
         else{
            const col = await db.collection("flashcards");
            const newAssignment = new FlashCard({
                class_ID : classID,
                assignment: req.body.assignment,
                card: assignmentsInClass + 1,
                translation : req.body.translation,
                audio: req.body.audio
            })
            await col.insertOne(newAssignment);
            const temp= await col.find({$and:[{"class_ID":classID},{"assignment": req.body.assignment},{"card": assignmentsInClass + 1}]}).toArray()
            const newAssignment_ID = temp[0]._id;
            const prompt = `created assignment no. ${assignmentsInClass + 1} `
            await createMetricsForStudent(newAssignment.assignment, classID, newAssignment.card)
            await addAssignmentToTheClass(classID, newAssignment_ID,res)
            res.send(prompt)
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new assignment no")
    }
}
// when you delete an assignment, the function will automatically delete the metrics of that assignment
async function findIdOfRelevantFlashcard (class_ID, nameOfAssignment){
    await connectToCoursesDB()
    const col = await db.collection("flashcards");
    const temp = await col.find({$and:[{"class_ID": class_ID},{"assignment": nameOfAssignment}]}).toArray();
    const arrOfFlashcard = temp.map(e => e._id)
    return arrOfFlashcard;
}
async function deleteAssignment(req, res){
    try {
        await connectToCoursesDB();
        const nameOfAssignment = req.body.assignment;
        const classID = new mongoose.Types.ObjectId(req.body.class_ID)
        const col = await db.collection("flashcards");
        const col1 = await db.collection("metrics");
        const col2 = await db.collection("classes")
        const arrOfAssign = await findAssignmentsByClassID(classID,nameOfAssignment)
        if(arrOfAssign.length !== 0){
            const arrOfObID = await findIdOfRelevantFlashcard(classID, nameOfAssignment);
            const temp = await col2.find({"_id": classID}).toArray()
            let updateArray = temp[0].assignments;
            arrOfObID.forEach(e => updateArray = updateArray.filter(e1 => !e1.equals(e)))
            await col.deleteMany({$and:[{"assignment" : nameOfAssignment, "class_ID" : classID}]});
            await col1.deleteMany({$and:[{"assignment" : nameOfAssignment, "classId" : classID}]});
            await col2.updateOne({"_id": classID},{$set:{"assignments": updateArray}})
            res.json({ message: "Deleted Assignment" });
        }
        else{
            res.json({message: "The assignment does not exist"})
        }
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
}
//Likewise, when you update an assignment you have to update the metrics too.
async function updateAssignment (req,res){
    try{
        await connectToCoursesDB();
        const col = await db.collection("flashcards")
        const col1 = await db.collection("metrics");
        const classID = req.body.class_ID
        const updatedAssignment = req.body.update_assignment
        col.updateMany(
            {$and:[{"assignment" : req.body.assignment, "class_ID" : classID}]},
            {$set:{"assignment":updatedAssignment}}
        )
        col1.updateMany(
            {$and:[{"assignment" : req.body.assignment, "classId" : classID}]},
            {$set:{"assignment":updatedAssignment}}
        )
    }
    catch (err){
        res.status(500).json({message:`Internal server error: ${err.message}`})
    }

}
module.exports = {findAssignmentsByClassID,updateAssignment,deleteAssignment,addNewAssignment}
