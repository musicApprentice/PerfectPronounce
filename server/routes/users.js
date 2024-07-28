const {findUsers,createNewUser,deleteUser, verifyLogin} = require('../database/userFunctions')
const express = require('express');
const router = express.Router(); 

router.get('/', async (req, res) => {
    await findUsers(req,res)
});

router.post('/', async (req, res) => {
    await createNewUser(req,res)
});

router.delete('/email/:email', async (req, res) => {
   await deleteUser(req,res)
});
router.get('/login', async(req,res,next) =>{
    res.json(await verifyLogin(req,res,next))
})

module.exports = router; 
