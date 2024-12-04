import React from "react";

function Login(){


    return(
        <div> <h2>Login</h2>
        <form>
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
          <button type="submit">Login</button>
        </form></div>
    )
}

export default Login;