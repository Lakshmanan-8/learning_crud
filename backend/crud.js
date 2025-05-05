const express  = require('express');
const app = express();

const port = 3000;

app.use(express.json());//automatically parse incoming data and enable req.body;

let user = [{id : 1, name:"lax"},{id:2,name:"vicky"}];

app.post('/user',async(req,res) =>{
    try{
    const newuser  =req.body;
    user.push(newuser);
    res.status(201).send("User Added Succefully");
    }
    catch(error)
    {
        res.status(500).send("User Not Added ");

    }
})

app.get('/user',async(req,res) =>{
    try{
    res.status(200).send(user);
    }
    catch(error)
    {
        res.status(404).send("Error");
    }
});

app.put('/user/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const updateuser = req.body;

    let userindex = user.findIndex(users => users.id == id);
    if(userindex ===-1)
    {
        return res.status(500).send("User not found");
    }

    user[userindex] = { ...user[userindex], ...updateuser};

    res.status(200).send("Updates Succefully");

    }
    catch(error)
    {
        res.status(404).send("Error updating user");
    }

});

app.delete('/user/:id',async(req,res) =>{
    try{
    const {id} = req.params;
    const inital = user.length;

    user = user.filter(users =>users.id != id);

    if(user.length == inital)
    {
        res.status(404).send("User Not found");
    }
    res.status(200).send("deleted succesfully");
}
catch(error)
{
    res.status(500).send("deleting error");
}
});
app.patch('/user/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const updateuser = req.body;

    let userindex = user.findIndex(users => users.id == id);
    if(userindex ===-1)
    {
        return res.status(500).send("User not found");
    }

    user[userindex] = { ...user[userindex], ...updateuser};

    res.status(200).send("Updates Succefully");

    }
    catch(error)
    {
        res.status(404).send("Error updating user");
    }

});

app.listen(port,() =>{
    console.log(`server is running in port :${port}`)
});
