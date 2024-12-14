import React from "react";

function EachEnrollments({ enrollments }) {
  return (
    <ul>
      {enrollments.map((enrollment) => (
        <li key={enrollment.enrolment_id}>
          <h2>{enrollment.student_name}</h2>
          <p>Course: {enrollment.course_name}</p>
        </li>
      ))}
    </ul>
  );
}

export default EachEnrollments;
