import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin(){

  const [instructors, setInstructors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [message, setMessage] = useState('');
  const navi = useNavigate(); 

  function handleViewCourses(){
    navi('/admin-dashboard/view-courses');
  }
  function handleViewStudents(){
    navi('/admin-dashboard/view-students');
  }


  useEffect(() => {
    // Fetch all instructors
    fetch('http://localhost:4000/instructors')
      .then((response) => response.json())
      .then((data) => setInstructors(data))
      .catch((error) => console.error('Error fetching instructors:', error));
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/admin-dashboard/add-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, instructorId: selectedInstructor }),
      });
  
      // Handle response and check for headers safely
      if (response.ok) {
        const data = await response.json();
        setMessage('Course added successfully');
      } else {
        const contentType = response.headers ? response.headers.get('Content-Type') : '';
        const errorMessage = contentType && contentType.includes('application/json')
          ? (await response.json()).message
          : await response.text(); // Fallback for non-JSON response
        setMessage(errorMessage || 'Failed to add course');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Error adding course');
    }
  };

    return(
        <div>
      <h1>Admin Dashboard</h1>
      
      <form onSubmit={handleAddCourse}>
        <div>
          <label htmlFor="name">Course Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="instructor">Assign Instructor</label>
          <select
            id="instructor"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            required
          >
            <option value="">Select an Instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.user_id} value={instructor.user_id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Course</button>
      </form>

      <button onClick={handleViewCourses}>View Courses</button>
      <button onClick={handleViewStudents}>View Students</button>
      <button >View Enrollments</button>
    </div>
    )
}

export default Admin;