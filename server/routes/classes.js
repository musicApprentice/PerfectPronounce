const {create_new_class, delete_class, findAllTheClass, addFlashcard, addStudentToClass} = require ('../database/classFunctions')
const express = require('express');
const router = express.Router(); 

router.route('/')
    .get(async(req, res) => { 
            await findAllTheClass(req,res);
    })
    .post(async (req, res) => {
       await create_new_class(req,res);
    })


router.delete('/id/:id', async (req, res) => {
    await delete_class(req,res);
});
// This route needs 2 parameters: flashcard_ID, and class_ID
router.put('/update/:flashcard', async(req,res) =>{
    await addFlashcard(req,res);
})
router.post('/add/:student', async(req,res) =>{
    await addStudentToClass(req,res)
} )

module.exports = router; 
