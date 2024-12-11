import React, { useState, useEffect } from 'react';

function Admin(){

  const [instructors, setInstructors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [message, setMessage] = useState('');

  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/admin/add-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, instructorId: selectedInstructor }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Course added successfully');
      } else {
        setMessage(data.message || 'Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Error adding course');
    }
  };


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