import React,{useState} from  "react";
import EachStudent from "./EachStudent";
import { useEffect } from "react";


function ShowStudents(){
    const [students, setStudents] = useState([]);

    useEffect(() => {
      // Fetch all students
      fetch("http://localhost:4000/students")
        .then((response) => response.json())
        .then((data) => setStudents(data))
        .catch((error) => console.error("Error fetching students:", error));
    }, []);
  
    return (
      <div>
        <h1>All Students</h1>
        <ul>
          <EachStudent students={students} />
        </ul>
      </div>
    );
}

export default ShowStudents;