import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
const apiUrl = process.env.REACT_APP_API_URL;
const LoginBody = ()=> {
       const navigate = useNavigate();
    const [login , setLogin] = useState({
        Email : '',
        Password : ''
    })
    const clear = ()=> {
         setLogin(
            {
                 Email:'',
                 Password:''
            }
         )
    }

    const setLog = (e)=> {
        const { name, value } = e.target;
        setLogin(prevState => ({
            ...prevState,
            [name]: value
          }));
    }

      const handleError = (err) =>
        toast.error(err, {
          position: "bottom-right",
        });
      const handleSuccess = (msg) =>
        toast.success(msg, {
          position: "bottom-right",
        });

    const Submit = async(e)=> {
         e.preventDefault();
       try {
        console.log("This is the Api url : ", apiUrl);
        const res = await axios.post(`${apiUrl}/Auth/Login`, login , {
            withCredentials: true,
         });
         navigate("/");
         handleSuccess("Wellcome!!");
         setTimeout( ()=> {
             
         },2000 )
         clear();
       } catch (error) {
        handleError("Email or pass is wrong ");
        setTimeout( ()=> {
            
        },2000 )
       }
    }
    
    return(
    <div className="Login-body">
        <h1>Login.............. </h1>
        <form className="" onSubmit={Submit}>
            <div className="form-group form">
                <label for="email"  >Email Address</label>
                <input onChange={setLog} style={{padding: " 12px " , margin: "12px 0 0 0 "}}  type="email" className="form-control" id="email" name="Email" value={login.Email} placeholder="Enter Email"></input>
                <small  className="form-text text-muted"  style={{opacity: "0.4"}}>Enter your Email Address </small>
            </div>
            <div className="form-group form" style={{marginTop: "12px "}}>
                <label for="Pass" >Password</label>
                <input onChange={setLog} value={login.Password} style={{padding: " 12px " , margin: "12px 0 0 0 "}} name="Password"  type="password" className="form-control" id="Pass" placeholder="Enter Pass"></input>
                <small className="form-text text-muted" style={{opacity: "0.4"}}>Enter Your Password </small>
            </div>
            <button  className="btn btn-primary" style={{width: "100px " , borderTopLeftRadius: "22px " }}>Submit </button>
        </form>
    </div>
    );
}

export default LoginBody ;