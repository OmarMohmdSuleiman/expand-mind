import React from "react";

function EachEnrollments({ enrollments }) {
  return (
    <div>
      {enrollments.map((enrollment, index) => (
        <div key={index}>
          <h2>{enrollment.name}</h2> {/* Display the student's name */}
          <ul>
            {enrollment.courses.map((course, courseIndex) => (
              <li key={courseIndex}>{course}</li>  
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default EachEnrollments;