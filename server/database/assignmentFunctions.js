const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://mkandeshwarath:i0ZlJmFjH5yGRFmF@languagemaestro.uks1z9z.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMaestro";
const client = new MongoClient(connectionString);
const Metrics = require('../models/metricsSchema');
const FlashCard = require('../models/flashcard');
var mongoose = require('mongoose');
let db;

async function connectToDB(){
    await client.connect();
    db = client.db("test");
}
async function findAllStudentInClass(classID,newStudent){
    const col = await db.collection("classes");
    if(newStudent){
        return [newStudent];
    }
    else{
    const temp = await col.find({"_id": classID}).toArray();
    const students = temp[0].students;
    return students;
    }
}

// create empty metric for each flashcard for each student in a specific class
async function createMetricsForStudent(assignmentName, classID, cardNo, newStudent){
    try{
        await connectToDB();
        const students = await findAllStudentInClass(classID, newStudent)
        students.forEach(async e => {
            const newMetric = new Metrics({
                classId : classID,
                assignment: assignmentName,
                card: cardNo,
                email: e,
                timesPracticed: 0,
                score: 0
            })
            await newMetric.save()
        })
    }
    catch(err){
        console.log(err.message);
    }
}
async function findAssignmentsByClassID(class_ID, assignmentName) {
    try {
        await connectToDB();
        const query = assignmentName 
            ? { $and: [{"class_ID": class_ID}, {"assignment": assignmentName}] } 
            : { "class_ID": class_ID };

        var assignments = await db.collection("flashcards").find(query).toArray();
        assignments = assignments.sort((a, b) => a.assignment.localeCompare(b.assignment));
        return assignments
    } catch (err) {
        console.log("Cannot access the database");
    } 
}
async function addAssignmentToTheClass(class_ID, newAssignmentID){
    await connectToDB();
    const col = await db.collection("classes")
    const tempClass = await col.find({"_id": class_ID}).toArray();
    const arrayAssigment = tempClass[0].assignments;
    if(arrayAssigment.some(e => e.equals(newAssignmentID))){
        console.log("Duplicate assignment")
    }
    else{
        arrayAssigment.push(newAssignmentID);
        await col.updateOne({"_id": class_ID},{$set:{"assignments":arrayAssigment}})
        console.log("Done for add assignment to the class")
    }
} 
async function createFlashcard(lengthOfAssignmentsInClass,col,classID,e){
    const newAssignment = new FlashCard({
        class_ID : classID,
        assignment: e.assignment,
        card: lengthOfAssignmentsInClass === 0 ? 1: lengthOfAssignmentsInClass + 1,
        translation : e.translation,
        audio: e.audio
    })
    await newAssignment.save();
    const positionOfNewAssignment= await col.find({$and:[{"class_ID":classID},{"assignment": e.assignment},{"card":newAssignment.card}]}).toArray()
    const newAssignment_ID = positionOfNewAssignment[0]._id;
    await createMetricsForStudent(newAssignment.assignment,classID, newAssignment.card)
    await addAssignmentToTheClass(classID, newAssignment_ID)
}
async function addNewAssignment(req, res){
    try {
        const classID = new mongoose.Types.ObjectId(req.body.class_ID);
        req.body.assignments.forEach(async e => {
        const totalNumberOfThatAssignment = (await findAssignmentsByClassID(classID, e.assignment)).length;
        const col = await db.collection("flashcards"); 
        await createFlashcard(totalNumberOfThatAssignment,col,classID,e)
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new assignment no")
    }
}
// when you delete an assignment, the function will automatically delete the metrics of that assignment
async function findIdOfRelevantFlashcard (class_ID, nameOfAssignment){
    await connectToDB()
    const col = await db.collection("flashcards");
    const temp = await col.find({$and:[{"class_ID": class_ID},{"assignment": nameOfAssignment}]}).toArray();
    const arrOfFlashcard = temp.map(e => e._id)
    return arrOfFlashcard;
}
async function deleteAssignment(req, res){
    try {
        await connectToDB();
        const nameOfAssignment = req.body.assignment;
        const classID = new mongoose.Types.ObjectId(req.body.class_ID)
        const col = await db.collection("flashcards");
        const col1 = await db.collection("metrics");
        const col2 = await db.collection("classes")
        const arrOfAssign = await findAssignmentsByClassID(classID,nameOfAssignment)
        if(arrOfAssign.length !== 0){
            const arrOfOfID = await findIdOfRelevantFlashcard(classID, nameOfAssignment);
            const temp = await col2.find({"_id": classID}).toArray()
            let updateArray = temp[0].assignments;
            arrOfOfID.forEach(e => updateArray = updateArray.filter(e1 => !e1.equals(e)))
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
        await connectToDB();
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
module.exports = {findAssignmentsByClassID,updateAssignment,deleteAssignment,addNewAssignment,createMetricsForStudent}
