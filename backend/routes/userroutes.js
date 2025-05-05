const express = require('express');
const router = express.Router();
const users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require('../middleware/authmiddleware');


router.post('/register',async(req,res)=>{

    const{name,email,age,password} = req.body;

    try
    {
        const exisitinguser = await users.findOne({email});
        if(exisitinguser)
        {
            return res.status(500).json({message : "Email already exsists"});
        }

        const user = new users({name,email,age,password});
        await user.save();

        const token = jwt.sign({userId:user._id},process.env.jwt_secret,{expiresIn:'1h'});
        res.status(201).json({message : "Registerd Successfully"});
    }
    catch(error)
    {
        res.status(404).json({message:"Cannot register"});
    }
});


router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await users.findOne({email});
        if(!user)
        {
            return res.status(404).json({message:"Oops : Email not exsists"});
        }   

        const ismatch =  await bcrypt.compare(password,user.password);
        if(!ismatch)
        {
            return res.status(404).json({message:"Invalid Password"});
        }
        const token =jwt.sign({userId:user._id},process.env.jwt_secret,{expiresIn:'1h'});

        return res.status(200).json({message:"Login successfull",token});
    }
    catch(error)
    {
        return res.status(500).json({message:"Login failed", error :error.message});
    }
});

router.get('/me', middleware, async (req, res) => {
    try {
        const user = await users.findById(req.user.userId).select('-password'); // remove password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});







router.get('/',middleware,async(req,res)=>
{
    try{

        
        const user = await users.find(); ;
        res.json(user);
    }
    catch(error)
    {
        res.json({message : "error"});
    }
});

router.put('/:id',async(req,res) =>{
    try{
        await users.findByIdAndUpdate(req.params.id,req.body,{runValidators:true});
        res.send("user updated");
    }
    catch(error)
    {
        res.send("Error updating");
    }
});

router.delete('/:id',middleware,async(req,res) =>
{
    try{
    await users.findByIdAndDelete(req.params.id);
    res.send("User deleted");
    }
    catch(error)
    {
        res.send("Error in deleting user");
    }
})

router.patch('/:id',async(req,res) =>
{
    try
    {
        await users.findByIdAndUpdate(req.params.id,req.body,{runValidators : true});
        res.send("users updated");
    }  
    catch(error)
    {
        res.send("eror updating usiing patch")
    }  
});

module.exports = router;
