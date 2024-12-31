import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Header from './Header';


function Admin(){
  const [adminData,setAdminData]=useState(null);
  const [instructors, setInstructors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [message, setMessage] = useState('');
     const [error, setError] = useState(null);

    const { id } = useParams();
  const navi = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    if (!token) {
      navi('/');
      return;
    }

    // Fetch the protected admin data from the backend
    fetch(`http://localhost:4000/admin-dashboard/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the request headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        return response.json();
      })
      .then((data) => {
        setAdminData(data);
      })
      .catch((err) => {
        setError('Could not load admin data');
        console.error(err);
      });
  }, [id, navi]);

  

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
  const handleViewCourses = () => navi('/admin-dashboard/view-courses');
  const handleViewStudents = () => navi('/admin-dashboard/view-students');
  const handleViewEnrollments = () => navi('/admin-dashboard/view-enrollments');
  const handleViewInstructors = () => navi('/admin-dashboard/view-instructors');

    return(
      <div><Header />
      <div className="container">
        <div className="box admin_box">
      <h1>Admin </h1>
      
      <form onSubmit={handleAddCourse}>
        <div className="div_3">
          <label htmlFor="name" className="label course_name">Course Name</label>
          <input
          className="input"
            type="text"
            id="name"
            placeholder="Enter course name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="div_1">
          <label htmlFor="description" className="label desc">Description</label>
          <textarea
          className="input"
          placeholder="What the course is about...."
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="div_2">
          <label htmlFor="instructor" className="label assign">Assign Instructor: </label>
          <select
            id="instructor"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            required
          >
            <option className="option default_option" value="">Select an Instructor</option>
            {instructors.map((instructor) => (
              <option className="option " key={instructor.user_id} value={instructor.user_id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn submit-btn" type="submit">Add Course</button>
      </form>
      <div className="view">
      <button className="view_content content_1" onClick={handleViewCourses}>View Courses</button>
      <button className="view_content" onClick={handleViewStudents}>View Students</button>
      <button className="view_content" onClick={handleViewEnrollments}>View Enrollments</button>
      <button className="view_content content_2" onClick={handleViewInstructors}>View Instructors</button>
    </div>
    </div></div></div>
    )
}

export default Admin;