const express = require('express');
const mongoose = require('mongoose');
const users = require('./models/user');
const dotenv = require('dotenv');
const userroutes = require('./routes/userroutes');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.mongourl).then(() =>console.log("db connected")).catch(err =>console.error("error:",err));

app.use('/user',userroutes);



app.listen(process.env.port,() =>{
    console.log(`Server is listening in the port :${process.env.port}`);
});