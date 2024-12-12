import React,{useState} from "react";
import { useEffect } from "react";
import Courses from "./Courses";

function ViewCourses(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      // Fetch all courses
      fetch('http://localhost:4000/courses')
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error('Error fetching courses:', error));
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