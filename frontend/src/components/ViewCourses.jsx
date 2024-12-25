import React,{useState} from "react";
import { useEffect } from "react";
import Courses from "./Courses";

function ViewCourses(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      const token=localStorage.getItem("token");
      // Fetch all courses
      if (token) {
      fetch('http://localhost:4000/courses', {
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token in the header
        },
      })
      .then((response) => {
        if (response.status === 403) {
          console.error("Access forbidden. User is not authorized.");
          return;
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
    }
  }, []);
  
    return (
      <div>
        <h1>All Courses</h1>
        <ul>
          <Courses courses={courses} />
        </ul>
      </div>
    );
}

export default ViewCourses;