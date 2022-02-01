import React, { useState ,useContext} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AlertContext from '../context/Alert/AlertContext';

export default function Login() {
   
    const context = useContext(AlertContext);
    const {showAlert} = context
    const [cred, setCred] = useState({email:"",password:""});
    let history = useHistory();
    const onSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
            
            headers: {
               "Content-Type":"application/json",
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZGNhYTBlMGFlMDY3MWE1ZGM0Nzk1In0sImlhdCI6MTY0Mjk4MzIyMX0.GiilwnpWibLpt8_9OTyt4bHrr0NGV6XwKpoe4-20YlE'
              
            },
            body:JSON.stringify({"email":cred.email,"password":cred.password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success===true)
          {
             localStorage.setItem('authtoken',json.authtoken)
             showAlert("logged in","success")
             history.push("/")

          }
          else
          {
            showAlert("invalid credential","danger")
          }
         
    }
    const onChange =(e)=>{
        

       setCred({...cred,[e.target.name]: e.target.value })
    }
    return <div className='container mt-3'>
        <h1 className='mb-3' style={{"margin-top":"5rem"}}>Login to Inotebook</h1>
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={cred.email} required onChange={onChange} aria-describedby="emailHelp" name='email'/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange} required/>
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>;
}
