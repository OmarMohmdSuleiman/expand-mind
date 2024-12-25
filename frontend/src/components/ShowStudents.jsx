import React,{useState} from  "react";
import EachStudent from "./EachStudent";
import { useEffect } from "react";



function ShowStudents(){
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);


    const token = localStorage.getItem("authToken");
    useEffect(() => {
      if (!token) {
        console.error("No token found, user is not authorized.");
        return; // Optionally, redirect to login page or show an error
      }
      // Fetch all students
      fetch("http://localhost:4000/students", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Include token in the Authorization header
          "Content-Type": "application/json", // Set Content-Type header if needed
        },
      })
        .then((response) => response.json())
        .then((data) => setStudents(data))
        .catch((error) => console.error("Error fetching students:", error));
    }, []);

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
        <h1>All Students</h1>
        
        <ul>
          <EachStudent students={students}  />
        </ul>
      </div>
    );
}

export default ShowStudents;