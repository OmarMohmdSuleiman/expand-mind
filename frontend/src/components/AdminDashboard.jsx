import React from "react";

function Admin(){
    return(
        <div>
      <h1>Admin Dashboard</h1>
      
      <form >
        <div>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            id="name"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
          />
        </div>
        <div>
          <label htmlFor="instructor">Assign Instructor</label>
          <select
            id="instructor"
            required
          >
            <option value="">Select an Instructor</option>
          </select>
        </div>
        <button type="submit">Add Course</button>
      </form>
    </div>
    )
}

export default Admin;