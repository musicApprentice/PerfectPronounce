const Metrics = require('../models/metricsSchema');
const FlashCard = require('../models/flashcardSchema');
const Class = require('../models/classSchema')
var mongoose = require('mongoose');
const User = require('../models/userSchema');




async function findAllStudentInClass(classID,newUserEmail){
    
    const temp = await Class.find({"_id": classID});
    const students = newUserEmail? [newUserEmail] :temp[0].students;
    return students;
}

// create empty metric for each flashcard for each student in a specific class
async function createMetricsForStudent(assignmentName, classID, cardNo, newUserEmail){
    try{
        var students = await findAllStudentInClass(classID,newUserEmail)
        students.forEach(async e => {
            const newMetric = new Metrics({
                classId : classID,
                assignment: assignmentName,
                card: cardNo,
                email: newUserEmail? newUserEmail :(await User.find({"_id":e}))[0].email,
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
        const query = assignmentName 
            ? { $and: [{"class_ID": class_ID}, {"assignment": assignmentName}] } 
            : { "class_ID": class_ID };

        var assignments = await FlashCard.find(query);
        assignments = assignments.sort((a, b) => a.assignment.localeCompare(b.assignment));
        return assignments
    } catch (err) {
        console.log("Cannot access the database");
    } 
}
async function createFlashcard(lengthOfAssignmentsInClass,classID,e){
    const newAssignment = new FlashCard({
        class_ID : classID,
        assignment: e.assignment,
        card: lengthOfAssignmentsInClass === 0 ? 1: lengthOfAssignmentsInClass + 1,
        translation : e.translation,
        audio: e.audio
    })
    await newAssignment.save();
    await createMetricsForStudent(newAssignment.assignment,classID, newAssignment.card)
}
async function addNewAssignment(req, res){
    try {
        const classID = new mongoose.Types.ObjectId(req.body.class_ID);
        req.body.assignments.forEach(async e => {
        const totalNumberOfThatAssignment = (await findAssignmentsByClassID(classID, e.assignment)).length; 
        await createFlashcard(totalNumberOfThatAssignment,classID,e)
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new assignment no")
    }
}
// when you delete an assignment, the function will automatically delete the metrics of that assignment
async function deleteAssignment(req, res){
    try {
        const nameOfAssignment = req.body.assignment;
        const classID = new mongoose.Types.ObjectId(req.body.class_ID)
        const arrOfAssign = await findAssignmentsByClassID(classID,nameOfAssignment)
        if(arrOfAssign.length !== 0){
            await FlashCard.deleteMany({$and:[{"assignment" : nameOfAssignment, "class_ID" : classID}]});
            await Metrics.deleteMany({$and:[{"assignment" : nameOfAssignment, "classId" : classID}]});
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
        const classID = req.body.class_ID
        const updatedAssignment = req.body.update_assignment
        FlashCard.updateMany(
            {$and:[{"assignment" : req.body.assignment, "class_ID" : classID}]},
            {$set:{"assignment":updatedAssignment}}
        )
        Metrics.updateMany(
            {$and:[{"assignment" : req.body.assignment, "classId" : classID}]},
            {$set:{"assignment":updatedAssignment}}
        )
    }
    catch (err){
        res.status(500).json({message:`Internal server error: ${err.message}`})
    }

}
module.exports = {findAssignmentsByClassID,updateAssignment,deleteAssignment,addNewAssignment,createMetricsForStudent}
