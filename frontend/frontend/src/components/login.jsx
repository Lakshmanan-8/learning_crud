import React,{useState} from "react";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

const Login = () =>{
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [success,setsuccess] = useState('');
    const [errormsg,seterrormsg] = useState('');

    const navigate = useNavigate();

    const handlesubmit = async (e)=>{
        e.preventDefault();

        const logindata = {email,password};

        try{
            const response = await axios.post('http://localhost:4000/user/login',logindata);
            setsuccess(response.data.message);
            seterrormsg('');
            setemail('');
            setpassword('');
            
            

            localStorage.setItem('token',response.data.token);
            navigate('/dashboard'); 

        }
        catch(error)
        {
                seterrormsg(error.response?.data?.message || 'Something went wrong');
                setsuccess('');
                
        }
    };

    return(
        <div>
                <h2>Login</h2>
                

                <form onSubmit={handlesubmit}>
                    <div>
                        <label>
                            Email
                        </label>
                        <input type = "email" value={email} onChange={(e) =>setemail(e.target.value)}required/>
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <input type = "password" value={password} onChange={(e) =>setpassword(e.target.value)}required/>
                    </div>

                    <button type='submit'>Login</button>
                    <center>{errormsg && <p style={{color:'red'}}>{errormsg}</p>}</center>
                <center>{success && <p style={{color:'green'}}>{success}</p>}</center>

                </form>

        </div>
    );
};
export default Login;