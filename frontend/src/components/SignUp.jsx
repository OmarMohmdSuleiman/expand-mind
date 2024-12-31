import React,{useState} from "react";
import { useNavigate } from "react-router-dom";



function SignUp(){

  const [role,setRole]=useState("");
  const navi=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleName(e){
    setName(e.target.value)
  }
  function handleEmail(e){
    setEmail(e.target.value)
  }
  function handlePass(e){
    setPassword(e.target.value)
  }

  function handleChange(e){
    setRole(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
    if (role) {
      // Send user data to the backend
      fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Redirect based on the role
          if (data) {
            navi(`/${role}-dashboard`);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please choose a role before signup");
    }
  }
    return(
        <div className="container">
          <div className="box">
          <h2 className="sign-word word">Sign Up</h2>
        <form onSubmit={handleSubmit}> 
        <div className="div_3">
            <label htmlFor="userName" className="label name">Name: </label>
            <input
             className="input na_me"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleName}
              required
            />
          </div>
          <div className="div_1">
            <label htmlFor="email" className="label email">Email: </label>
            <input
             className="input the-email"
              type="text"
              id="email"
              placeholder="Enter your username"
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
          <div className="div_4">
          <label htmlFor="role" className="label role">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleChange}
            required
          >
            <option className="option default_option" value="">Select Role</option>
            <option className="option" value="student">Student</option>
            <option className="option" value="instructor">Instructor</option>
            <option className="option" value="admin">Admin</option>
          </select>
        </div>
          <button type="submit" className="btn signup-btn">SignUp</button>
        </form></div></div>
    )
}

export default SignUp;