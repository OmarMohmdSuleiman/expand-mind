import React from "react";

function Courses({ courses }) {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.course_id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <p>Instructor name: {course.instructor_name}</p>
        </li>
      ))}
    </ul>
  );
}

export default Courses;
