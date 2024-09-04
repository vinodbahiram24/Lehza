import React, { useState } from "react";
import "../css/signIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function SignInPage(props) {

   // Sign-Up Form State
   const [signUpUsername, setSignUpUsername] = useState("");
   const [signUpEmail, setSignUpEmail] = useState("");
   const [signUpMobile, setSignUpMobile] = useState("");
   const [signUpPassword, setSignUpPassword] = useState("");
   const [signUpMessage, setSignUpMessage] = useState("");
   
   // Sign-In Form State
   const [signInUsername, setSignInUsername] = useState("");
   const [signInPassword, setSignInPassword] = useState("");
   const [signInMessage, setSignInMessage] = useState("");

   const navigate = useNavigate();

  const handleSignUp= async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/register",{username : signUpUsername, email:signUpEmail, mobile:signUpMobile, password: signUpPassword});
      setSignUpMessage(response.data);
    } catch (error) {
      console.error("error while registering: ", error);
      setSignUpMessage("User Already Exists!!");
    } 
  }

  const handleSignIn = async (e)=>{
    e.preventDefault();
    try {
     const response = await axios.post("http://localhost:8080/users/auth", {username : signInUsername, password: signInPassword});
     setSignInMessage(response.data);
     localStorage.setItem("username",signInUsername)
     localStorage.setItem("password",signInPassword)
     if(response.data === "AUTHORIZED")
     {navigate("/home")}
     else
     {setSignInMessage("Invalid Credentials!")}

    } catch (error) {
      console.error("error while sign in: ", error);
      setSignInMessage(error);
    }
  }

  setTimeout(() => {
    setSignUpMessage("");
    setSignInMessage("");
  }, 10000); 
  
  return (
    <div className="container">
      <div className="row py-5 ">
        {/* sign up */}
        <div className="signUp col-md-4">
          <form>
            <label aria-hidden="true">Sign Up</label>
            <input id="username" value={signUpUsername} type="text" placeholder=" UserName" onChange={(e)=>setSignUpUsername(e.target.value)} required></input>
            <input id="email" value={signUpEmail} type="email" placeholder=" Email" onChange={(e)=>setSignUpEmail(e.target.value)} required></input>
            <input id="mobile" value={signUpMobile} type="tel" placeholder=" Mobile" onChange={(e)=>setSignUpMobile(e.target.value)} required></input>
            <input id="password" value={signUpPassword} type="password" placeholder=" Password" onChange={(e)=>setSignUpPassword(e.target.value)} required></input>
            <button type="submit" onClick={handleSignUp}>Sign Up</button>
            {signUpMessage && (<div className="message-div"><p>{signUpMessage}</p></div>
          )}
          </form>
        </div>
        {/* sign in */}
        <div className="signIn col-md-4">
          <form>
            <label aria-hidden="true">Sign In</label>
            <input id="signInUsername" value={signInUsername} type="text" placeholder=" UserName" onChange={(e)=>setSignInUsername(e.target.value)} required></input>
            <input id="signInPassword" value={signInPassword} type="password" placeholder=" Password" onChange={(e)=>setSignInPassword(e.target.value)} required></input>
            <button type="submit" onClick={handleSignIn}>Sign In</button>
            <div><p style={{color:'white'}}>{signInMessage}</p></div>
          </form>
        </div>
      </div>
    </div>
  );
}
