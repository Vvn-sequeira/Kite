import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const apiUrl = process.env.REACT_APP_API_URL;

const SignUpBody = () => {
  const navigate = useNavigate();
  const [Signup, setSignup] = useState({
    Email: "",
    Username: "",
    Password: "",
  });
  const clear = () => {
    setSignup({
      Email: "",
      Username: "",
      Password: "",
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });


  const setLog = (e) => {
    const { name, value } = e.target;
    setSignup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const Submit = async (e) => {
    try {
      e.preventDefault();
      console.log("submit trigered ");
      const { data } = await axios.post(`${apiUrl}/Auth/Signup`, Signup, {
        withCredentials: true,
      });

      const { success, message } = data;

      if(!success){
         const errmsg = data.message ;
         throw new Error("seeee");
         
      }
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }

      console.log("Stored Succesfully");
      clear();
    } catch (error) {
      handleError(error.message);
      setTimeout(() => {
       console.log(error);
      }, 1000);
    }
  };
  return (
    <div className="Login-body">

      <h1>Signup............ </h1>
      <form className="" onSubmit={Submit}>
        <div className="form-group form">
          <label for="email">Email Address</label>
          <input
            value={Signup.Email}
            onChange={setLog}
            onSubmit={Submit}
            name="Email"
            style={{ padding: " 12px ", margin: "12px 0 0 0 " }}
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter Email"
          ></input>
          <small class="form-text text-muted" style={{ opacity: "0.4" }}>
            We'll never share your email.
          </small>
        </div>
        <div className="form-group form">
          <label for="User">Username </label>
          <input
            value={Signup.Username}
            onChange={setLog}
            onSubmit={Submit}
            name="Username"
            style={{ padding: " 12px ", margin: "12px 0 0 0 " }}
            type="User"
            className="form-control"
            id="email"
            placeholder="Enter Unique Username "
          ></input>
          <small class="form-text text-muted" style={{ opacity: "0.4" }}>
            We'll never share your email.
          </small>
        </div>
        <div className="form-group form" style={{ marginTop: "12px " }}>
          <label for="Pass">Password</label>
          <input
            value={Signup.Password}
            onChange={setLog}
            onSubmit={Submit}
            name="Password"
            style={{ padding: " 12px ", margin: "12px 0 0 0 " }}
            type="password"
            className="form-control"
            id="Pass"
            placeholder="Enter Pass"
          ></input>
          <small class="form-text text-muted" style={{ opacity: "0.4" }}>
            Will be stored Securely
          </small>
        </div>
        <button
          className="btn btn-primary"
          style={{ width: "100px ", borderTopLeftRadius: "22px " }}
        >
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUpBody;
