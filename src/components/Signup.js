import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AlertContext from '../context/Alert/AlertContext';
export default function Signup() {

    const context = useContext(AlertContext);
    const {showAlert} = context
     let history = useHistory();
    const [cred, setCred] = useState({name:"",email:"",password:""});
    const onSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth", {
            method: 'POST', 
            
            headers: {
               "Content-Type":"application/json",
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZGNhYTBlMGFlMDY3MWE1ZGM0Nzk1In0sImlhdCI6MTY0Mjk4MzIyMX0.GiilwnpWibLpt8_9OTyt4bHrr0NGV6XwKpoe4-20YlE'
              
            },
            body:JSON.stringify({"name":cred.name,  "email":cred.email,"password":cred.password})
          });
          const json = await response.json()
          
          if(json.success === true)
          {
              history.push("/")
              showAlert("signed in","success")
          }
          else
          {
            showAlert("User exist already","danger")
          }
    }
    const onChange =(e)=>{
        setCred({...cred,[e.target.name]: e.target.value })
     }
    return <div className='container'>
        <form onSubmit={onSubmit}>
        <div className="mb-3">
                <label htmlFor="exampleInputname1" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={cred.name} required onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={cred.email} required onChange={onChange} name="email" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={cred.password} minLength={5}  required onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>;
}
