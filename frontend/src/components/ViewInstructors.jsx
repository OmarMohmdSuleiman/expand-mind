import React,{useState,useEffect} from "react";
import Instructors from "./Instructor";

function ViewInstructors(){
    const[instructors,setInstructor]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:4000/instructor")
        .then((response) => response.json())
    .then((data) => setInstructor(data))
    .catch((error) => console.error('Error fetching instructors:', error));
}, []);
   
    return(
        <div>The instructors are :
            <ul>
            {instructors.map((instructor, index) => (
          <Instructors
            key={index}
            name={instructor.instructor_name} // Instructor's name
            course={instructor.title} // Course title
          />
        ))}
            </ul>
        </div>
    );
}
export default ViewInstructors;