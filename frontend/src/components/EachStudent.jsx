import React from "react";


function EachStudent({students}){
    return (
        <>
      {students.map((student) => (
        <li key={student.user_id}>
          <h2>Student name: {student.name}</h2>
          <p>Email: {student.email}</p>
        </li>
          ))}
        </>
      );

}
export default EachStudent;