const express = require('express');
const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://mkandeshwarath:i0ZlJmFjH5yGRFmF@languagemaestro.uks1z9z.mongodb.net/?retryWrites=true&w=majority&appName=LanguageMaestro";
const client = new MongoClient(connectionString);
const router = express.Router(); 
let db;
    

// helper function to connect to server
async function connect_to_courses_test(){
    await client.connect();
    db = client.db("CoursesTest");
}

async function getAllAssignments () {
    try {
      await connect_to_courses_test()
        const assignment = await(db.collection("assignments").find().toArray());
        return assignment;
    } catch (err) {
       console.log("Cannot access the database");

    } 
}
// print out all the assignments in a particular class. 
router.get('/', async(req, res) =>{
    const assignments = await getAllAssignments();
    res.send(assignments)
});
//

// Add assignment to class
router.post('/', async (req, res) => {
    const assignments = await getAllAssignments();
    try {
        await connect_to_courses_test();
        const number_of_same_assignments = assignments.filter(e => e.assignment === req.body.assignment && e.class_ID === req.body.class_ID).length;
        if(number_of_same_assignments === 0){
            const col = await db.collection("assignments");   
            col.insertOne({"class_ID" : req.body.class_ID, "assignment": req.body.assignment, "card": 1, "translation" : req.body.translation,"audio": req.body.audio});
            res.send("created first one of the new assignment")
        }
         else{
        const col = await db.collection("assignments");
        col.insertOne({"class_ID" : req.body.class_ID, "assignment": req.body.assignment, "card": number_of_same_assignments + 1 , "translation" : req.body.translation,"audio": req.body.audio});
        const prompt = `created assingment no ${number_of_same_assignments + 1} `
        res.send(prompt)
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
        console.log("error created new assignment")
    }
});
 // delete all specific assignments in one class
 router.delete('/name/:name', async (req, res) => {
     try {
        connect_to_courses_test();
         const name_of_assignment = req.body.assignment;
         const class_name = req.body.class_ID
         const col = await db.collection("assignments");
        col.deleteMany({$and:{"assignment" : name_of_assignment, "class_ID" : class_name}});
         res.json({ message: "Deleted Assignment" });
     } catch (err) {
         res.status(500).json({ message: `Internal server error: ${err.message}` });
     }
 });

 // update assignment in a particular class. This function requires 3 parameters: class_ID, name of assignment, and new assignment
    router.put('/update/:update_assignment', async (req,res) =>{
        try{
            await connect_to_courses_test();
            const col = await db.collection("assignments")
            const classID = req.body.class_ID
            const updated_assignment = req.body.update_assignment
            col.updateMany({$and:[{"assignment" : req.body.assignment, "class_ID" : classID}]}, {$set:{"assignment":updated_assignment}})
            const new_ass = (await getAllAssignments()).filter(e => e.assignment === updated_assignment && e.class_ID === classID);
            console.log(new_ass)
        }
        catch (err){
            res.status(500).json({message:`Internal server error: ${err.message}`})
        }

    })
    module.exports = router; 
