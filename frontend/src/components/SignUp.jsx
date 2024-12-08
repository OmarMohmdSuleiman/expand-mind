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
      alert("Please choose a role");
    }
  }
    return(
        <div><h2>Sign Up</h2>
        <form onSubmit={handleSubmit}> 
        <div>
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleName}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your username"
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
          <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
          <button type="submit">SignUp</button>
        </form></div>
    )
}

export default SignUp;