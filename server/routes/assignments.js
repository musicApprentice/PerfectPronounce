const {findAssignmentsByClassID, addNewAssignment, deleteAssignment,updateAssignment} = require('../database/assignmentFunctions');
const express = require('express');
const router = express.Router(); 


// print out all the assignments in a particular class. 
router.get('/', async(req, res) =>{
    const assignments = await findAssignmentsByClassID(req.body.class_ID, req.body.assignmentName);
    res.send(assignments)
});

// create assignment to class
router.post('/', async (req, res) => {
    await addNewAssignment(req,res);
});
 // delete all specific assignments in one class
 router.delete('/name/:name', async (req, res) => {
    await deleteAssignment(req,res)
 });

 // update assignment in a particular class. This function requires 3 parameters: class_ID, name of assignment, and new assignment
    router.put('/update/:update_assignment', async (req,res) =>{
        await updateAssignment(req,res);
    })
module.exports = router; 
