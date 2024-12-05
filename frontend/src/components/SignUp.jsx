import React from "react";


function SignUp(){
    return(
        <div><h2>Sign Up</h2>
        <form>
        <div>
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
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