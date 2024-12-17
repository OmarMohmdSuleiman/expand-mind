import React from "react";
import Enrollment from "./Enrollment";

function EachEnrollments({ enrollments }) {
  return (
    <div>
      <ul>
        {enrollments.map((enrollment, index) => (
          <Enrollment key={index} name={enrollment.name}>
            <ul>
              {enrollment.courses.map((course, courseIndex) => (
                <li key={courseIndex}>{course}</li>
              ))}
            </ul>
          </Enrollment>
        ))}
      </ul>
    </div>
  );
}

export default EachEnrollments;