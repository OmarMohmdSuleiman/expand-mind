import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import StudentCourses from "./StudentCourses";
import Header from "./Header";

function Students(){
    const {id}=useParams();
    const[student,setStudent]=useState(null);
   const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
          try {
            const token = localStorage.getItem('token');
            console.log("Token:", token);
            const response = await fetch(`http://localhost:4000/student/${id}`,{
              method:"GET",
              headers: {
                'Authorization': `Bearer ${token}`, 
              }
            });
            const data = await response.json();
            if (response.ok) {
              setStudent(data);
            } else {
              console.error("Error fetching student details:", data.message);
              setError(data.message);
            }
          } catch (error) {
            console.error("Error fetching student details:", error);
            setError("An error occurred while fetching student details.");
          }
        };
    
        if (id) {
          fetchStudentDetails();
        }
      }, [id]);
    
      if (error) {
        return <div>Error: {error}</div>;
      }
    
      if (!student) {
        return <div>Loading...</div>;
      }
    
           
    return(
      <div><Header />
        <div className="box">
        <h2 className="student_name the_name">{student.name}</h2>
        <h3 className="student_email">Email: {student.email}</h3>
        <h3>The Course/s: </h3>
        
            <StudentCourses courses={student.enrolled_courses} />
        
        </div></div>
    )
}

export default Students;