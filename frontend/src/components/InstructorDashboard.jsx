import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

function InstructorDashboard() {
  const { id } = useParams(); // Get instructor ID from URL
  const [instructorData, setInstructorData] = useState(null);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        const token = localStorage.getItem('token');
            console.log("Token:", token);
        const response = await fetch(`http://localhost:4000/instructor/${id}`,{
          method:"GET",
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        });
        const data = await response.json();

        if (response.ok) {
          setInstructorData(data);
        } else {
          console.error("Error fetching instructor details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    if (id) {
      fetchInstructorDetails(); // Fetch only if `id` exists
    }
  }, [id]);

  return (
    <div>
      <Header />
      <div className="box">
    <h1>Instructor </h1>
    {instructorData ? (
      <div>
        <h2 className="inst_name the_name">Welcome, {instructorData.instructor_name}</h2>
        <h3>The Course/s: </h3>
        <ul className="ul">
          {instructorData.courses.map((course, index) => (
            <li className="li li_inst" key={index}>{course}</li>
          ))}
        </ul>
      </div>
    ) : (
      <p>Log in first, Regards...</p>
    )}
  </div></div>
    
  );
}

export default InstructorDashboard;