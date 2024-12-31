import React from "react";

function StudentCourses({courses}) {
  return (
    <ul className="ul">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <li className="li li_student " key={index}>
            <a href={`/course/${course}`}>{course}</a> {/* Each course is now a link */}
          </li>
        ))
      ) : (
        <p>No courses enrolled.</p>
      )}
    </ul>
  );
};

export default StudentCourses;