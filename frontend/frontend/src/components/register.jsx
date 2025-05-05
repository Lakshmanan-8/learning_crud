import React,{useState} from "react";   
import axios from 'axios';

import '../styles/register.css';


const Register =  () =>
{
        const[name,setname] =  useState('');
        const[email,setemail] = useState('');
        const[age,setage] = useState('');
        const[password,setpassword] = useState('');
        const[errormessage,seterrormessage] = useState('');
        const[successMessage,setsuccessMessage] = useState('');
        const [redirect, setRedirect] = useState(false);


        const handlesubmit = async (e) =>{
            e.preventDefault();

            const userdata = {
                name,email,age,password
            };

            
            try
            {
                const response = await axios.post('http://localhost:4000/user/register',userdata);

                setsuccessMessage(response.data.message);
                seterrormessage('');
                setname('');
                setemail('');
                setage('');
                setpassword('');
                setRedirect(true);
            }
            catch(error)
            {
                seterrormessage(error.response?.data?.messsage||"Something went wrong");
                setsuccessMessage('');  
            }

        };
        if (redirect) {
            window.location.href = '/login'; // Redirect to login page
          }

        return(
            <div>
                <h2>Register-Form</h2>

                

                <form onSubmit={handlesubmit}>
                    <div>
                        <label>Name</label>
                        <input type = "text" value={name} onChange={(e) => setname(e.target.value)} required/>
                     </div>

                     <div>
                        <label>Email</label>
                        <input type = "email" value={email} onChange={(e) => setemail(e.target.value)}required/>
                     </div>

                     <div>
                        <label>Age</label>
                        <input type = "number" value={age} onChange={(e) => setage(e.target.value)}required/>
                     </div>
                     
                     <div>
                        <label>Password</label>
                        <input type = "password" value={password} onChange={(e) => setpassword(e.target.value)}required/>
                     </div>


                        <button type = "submit"> Register</button>
                        {errormessage && <p style =  {{color:'red'}}>{errormessage}</p>}
                {successMessage && <p style = {{color:'green'}}>{successMessage}</p>}


                </form>
            </div>
        );

};

export default Register;