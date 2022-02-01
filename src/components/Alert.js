
  
import React, { useContext } from 'react'
import AlertContext from '../context/Alert/AlertContext';


const  Alert = () =>{
    const context = useContext(AlertContext);
    const {alert} = context;
    console.log(context);
    return (
           alert&&<div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{alert.msg}</strong> 
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alert;