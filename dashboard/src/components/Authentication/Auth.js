import React, { useState } from "react";
import LoginBody from "./LoginBody";
import SignUpBody from "./SignUpBody";
import "./Auth.css";
const Auth = () => {
  let [log , setlog ] = useState(1)

  const setLog = (i)=> {
      setlog(i)
  }
  return(
  <div>
      <div className="Auth">
           <div className="row Auth-row">
            <div className="col-6 Auth-col" style={{backgroundColor: "#66f084"}} onClick={()=> { setLog(1)}}>Login</div>
            <div className="col-6 Auth-col" style={{backgroundColor: "#ae49c2"}} onClick={()=> { setLog(2)}}>Signup</div>
           </div>
           
          {log === 1 ?  
           <div className="Auth-Login-body Auth-body">
               <LoginBody></LoginBody>
             </div> :  
              <div className="Auth-Login-body Auth-body">
               <SignUpBody></SignUpBody>
             </div>
             }
          
            
          
      </div>
  </div>
  )
};

export default Auth;
