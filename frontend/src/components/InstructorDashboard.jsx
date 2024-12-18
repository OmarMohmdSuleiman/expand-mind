import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InstructorDashboard() {
  const { id } = useParams(); // Get instructor ID from URL
  const [instructorData, setInstructorData] = useState(null);

  useEffect(() => {
    const fetchInstructorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/instructor/${id}`);
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
      <h1>Instructor Dashboard</h1>
      {instructorData ? (
        <div>
          <h2>{instructorData.instructor_name}</h2>
          <ul>
            {instructorData.courses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InstructorDashboard;