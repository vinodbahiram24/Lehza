import React, { useState } from "react";
import "../css/signIn.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignInPage(props) {

   // Sign-Up Form State
   const [signUpUsername, setSignUpUsername] = useState("");
   const [signUpEmail, setSignUpEmail] = useState("");
   const [signUpMobile, setSignUpMobile] = useState("");
   const [signUpPassword, setSignUpPassword] = useState("");
   const [signUpMessage, setSignUpMessage] = useState("");
   const [showSignUp, setShowSignUp] = useState(false);
   
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
      setSignUpUsername("");
      setSignUpEmail("");
      setSignUpMobile("");
      setSignUpPassword("");
      console.error("error while registering: ", error);
      setSignUpMessage("User Already Exists!!");
    } 
  }

  const handleSignIn = async (e)=>{
    e.preventDefault();
    try {
     const response = await axios.post("http://localhost:8080/users/login", {username : signInUsername, password: signInPassword});
     setSignInMessage(response.data);
     if(response.data !== "UNAUTHORIZED")
     {
      localStorage.setItem("token",response.data);
      navigate("/home");
     }
     else
     {setSignInMessage("Invalid Credentials!")}

    } catch (error) {
      console.error("error while sign in: ", error);
      setSignInMessage(error);
    }
  }

  const registerHereBtn = () => {
    setShowSignUp(!showSignUp);
  };

  setTimeout(() => {
    setSignUpMessage("");
    setSignInMessage("");
  }, 5000); 
  
  return (
    <div className="login">
      <div>
        {/* sign up */}
        <div className="signUp" style={{ display: showSignUp ? 'block' : 'none' }}>
          <form onSubmit={handleSignUp}>
            <p className="headText">Become a <span className="headTextSpan">Lehza </span>Member!</p>
            <input className="signInInput" id="username" value={signUpUsername} type="text" placeholder=" UserName" onChange={(e)=>setSignUpUsername(e.target.value)} required></input>
            <input className="signInInput" id="email" value={signUpEmail} type="email" placeholder=" Email" onChange={(e)=>setSignUpEmail(e.target.value)} required></input>
            <input className="signInInput" id="mobile" value={signUpMobile} type="tel" placeholder=" Mobile" onChange={(e)=>setSignUpMobile(e.target.value)} required></input>
            <input className="signInInput" id="password" value={signUpPassword} type="password" placeholder=" Password" onChange={(e)=>setSignUpPassword(e.target.value)} required></input>
            <button className="signInBtn" type="submit">Sign Up</button>
          </form>
          <div className="message-div"><p>{signUpMessage}</p></div>
          <p className="registerHereBtnText">Already have Account?<button className="registerHereBtn" onClick={registerHereBtn}>Login Here</button></p>
        </div>
        {/* sign in */}
        <div className="signIn" style={{display: showSignUp ? 'none' : 'block' }}>
          <form onSubmit={handleSignIn}> 
            <p className="headText">Welcome Back!</p>
            <input className="signInInput" id="signInUsername" value={signInUsername} type="text" placeholder=" UserName" onChange={(e)=>setSignInUsername(e.target.value)} required></input>
            <input className="signInInput" id="signInPassword" value={signInPassword} type="password" placeholder=" Password" onChange={(e)=>setSignInPassword(e.target.value)} required></input>
            <button className="signInBtn" type="submit">Login</button><br/>
          </form>
          <Link className="forgotPasswordLink" to="/forgotPassword">forgot password?</Link>
          <div className="message-div"><p>{signInMessage}</p></div>
          <p className="registerHereBtnText">New User? <button className="registerHereBtn" onClick={registerHereBtn}>Register Here</button></p>
        </div>
      </div>
    </div>
  );
}
