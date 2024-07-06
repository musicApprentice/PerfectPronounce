const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://mkandeshwarath:i0ZlJmFjH5yGRFmF@languagemaestro.uks1z9z.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMaestro";
const client = new MongoClient(connectionString);
let db;

async function connectToCoursesDB(){
    await client.connect();
    db = client.db("CoursesTest");
}
async function getAllAssignments() {
    try {
      await connectToCoursesDB()
        const assignment = await(db.collection("assignments").find().toArray());
        return assignment;
    } catch (err) {
       console.log("Cannot access the database");

    } 
}
async function addNewAssignment(req, res){
    const assignments = await getAllAssignments();
    try {
        const assignmentInClass = assignments.filter(e => e.assignment === req.body.assignment && e.class_ID === req.body.class_ID).length;
        if(assignmentInClass === 0){
            const col = await db.collection("assignments");   
            col.insertOne({"class_ID" : req.body.class_ID,
                        "assignment": req.body.assignment,
                        "card": 1, "translation" : req.body.translation,
                        "audio": req.body.audio});
            res.send("created first one of the new assignment")
        }
         else{
            const col = await db.collection("assignments");
            col.insertOne({"class_ID" : req.body.class_ID,
                        "assignment": req.body.assignment,
                        "card": assignmentInClass + 1 ,
                        "translation" : req.body.translation,
                        "audio": req.body.audio});
            const prompt = `created assingment no. ${assignmentInClass + 1} `
            res.send(prompt)
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new assignment")
    }
}
async function deleteAssignment(req, res){
    try {
        await connectToCoursesDB();
        const nameOfAssignment = req.body.assignment;
        const className = req.body.class_ID
        const col = await db.collection("assignments");
        const arrOfAssign = await col.find({"assignment" : nameOfAssignment, "class_ID" : className}).toArray()
        if(arrOfAssign.length !== 0){
         await col.deleteMany({"assignment" : nameOfAssignment, "class_ID" : className});
         res.json({ message: "Deleted Assignment" });
        }
        else{
            res.json({message: "The assignment does not exist"})
        }
    } catch (err) {
        res.status(500).json({ message: `Internal server error: ${err.message}` });
    }
}
async function updateAssignment (req,res){
    try{
        await connectToCoursesDB();
        const col = await db.collection("assignments")
        const classID = req.body.class_ID
        const updatedAssignment = req.body.update_assignment
        col.updateMany({$and:[{"assignment" : req.body.assignment, "class_ID" : classID}]}, {$set:{"assignment":updatedAssignment}})
        const newAssignment = (await getAllAssignments())
        .filter(e => e.assignment === updatedAssignment && e.class_ID === classID);
        console.log(newAssignment)
    }
    catch (err){
        res.status(500).json({message:`Internal server error: ${err.message}`})
    }

}
module.exports = {getAllAssignments,updateAssignment,deleteAssignment,addNewAssignment}
