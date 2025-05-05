const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userschema = new mongoose.Schema({

    
    name:{
        type : String,
        required:[true,'Name is required'],
        minLength:[3,'Name must contain atleast 3 characters'],
        trim:true,
        validate:{
            validator:function(v)
            {
                return  /^[A-Za-z\s]+$/.test(v);
            },
            message : props =>`${props.value} is not a valid`
        }
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        validate:{
            validator:function(v)
            {
                return /.+\@.+\..+/.test(v);
            },
            message: props =>`${props.value} is not valid!!`
        }
    },
    age:{
        type:Number,
        required:[true,'Age is required'],
        min:[18,'Minimum age should be 18'],
        max:[100,'Maximum Age should be 100']
    },
    password:{
        type:String,
        minLength:[6,'Minimum 6 characters required'],
        required:[true,'Password required'],
        trim:true
    }
});

userschema.pre('save',async function(next) {
    if(!this.isModified('password'))return next();

    try
    {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();

    }
    catch(err)
    {
        next(err);
    }
    
});


module.exports = mongoose.model('users',userschema);
