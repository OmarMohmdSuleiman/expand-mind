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

      if (response.ok) {
        // Assuming the response includes user data
        console.log("Login successful", data.user);
        // Redirect based on the user's role
        if (data.user.role === "student") {
          navi("/student-dashboard");
        } else if (data.user.role === "instructor") {
          navi("/instructor-dashboard");
        } else if (data.user.role === "admin") {
          navi("/admin-dashboard");
        }
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

    return(
        <div> <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePass}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <h4>No account ? <button onClick={SignUpRoute}>SignUp</button></h4></div>
    )
}

export default Login;