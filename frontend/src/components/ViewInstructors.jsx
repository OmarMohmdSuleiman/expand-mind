  import React,{useState,useEffect} from "react";
  import Instructors from "./Instructor";

  function ViewInstructors(){
      const[instructors,setInstructor]=useState([]);

      useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token) {
          fetch("http://localhost:4000/instructor", {
            headers: {
              "Authorization": `Bearer ${token}`, // Include the token in the request header
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Fetched instructors:', data);  // Log the data to inspect its structure
              setInstructor(data);
            })
            .catch((error) => console.error('Error fetching instructors:', error));
        }
      }, []);
    

      function handleDelete(id) {
        console.log('Instructor ID to delete:', id); // Log the ID to verify it's being passed
        if (!id) {
          console.error('Invalid instructor ID:', id);
          return; // Prevent deletion if ID is invalid
        }
    
        const token = localStorage.getItem("token"); // Get token from localStorage
        fetch(`http://localhost:4000/instructor/${id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${token}`, // Include the token in the request header
          },
        })
          .then((response) => {
            if (response.ok) {
              setInstructor((prevInstructors) =>
                prevInstructors.filter((instructor) => instructor.user_id !== id)
              );
            } else {
              console.error('Failed to delete instructor');
              response.json().then((data) => console.error(data.message)); // Log the error message from the server
            }
          })
          .catch((error) => console.error('Error deleting instructor:', error));
      }
    

      return(
          <div>The instructors are :
              <ul>
              {instructors.map((instructor, index) => (
            <Instructors
              key={index}
              name={instructor.instructor_name} // Instructor's name
              course={instructor.title} // Course title
              onDelete={() => handleDelete(instructor.user_id)}
            />
          ))}
              </ul>
          </div>
      );
  }
  export default ViewInstructors;