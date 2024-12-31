import React,{useState} from "react";
import SignUp from "./SignUp";
import {useNavigate} from "react-router-dom";

function Login(){
  const navi=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function SignUpRoute(){
    navi('/signup');
  }
  function handleEmail(e){
    setEmail(e.target.value);
  }
  function handlePass(e){
    setPassword(e.target.value);
  }
  async function handleLogin(e) {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Backend Response:", data);
  
      if (response.ok) {
        if (data && data.token) {
          // Save the token to localStorage
          localStorage.setItem("token", data.token);
  
          // Assuming the response includes user data
          console.log("Login successful", data.name);
  
          // Redirect based on the user's role
          if (data.role === "student") {
            navi(`/student-dashboard/${data.id}`);
          } else if (data.role === "instructor") {
            console.log("Navigating to Instructor Dashboard");
            navi(`/instructor-dashboard/${data.id}`);
          } else if (data.role === "admin") {
            navi(`/admin-dashboard/${data.id}`);
          } else {
            console.log("No role found in user data");
          }
        } else {
          console.log("Token not found in the user data");
        }
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }
    return(
        <div className="container">
          <h1 className="title">Welcome to<span>ExpandMind </span>Academy</h1>
          <div className="box">
        <h2 className="login-word word">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="div_1">
            <label htmlFor="email" className="label email">Email: </label>
            <input
            className="input the-email"
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="div_2">
            <label htmlFor="password" className="label password">Password: </label>
            <input
            className="input pass"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePass}
              required
            />
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <h4>No account ? <button  className="btn signup-btn" onClick={SignUpRoute}>SignUp</button></h4>
        </div>
        </div>
    )
}

export default Login;