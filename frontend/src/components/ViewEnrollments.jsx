import React, { useState, useEffect } from "react";
import EachEnrollments from "./EachEnrollment";

function ViewEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/enrollments")
    .then((response) => response.json())
    .then((data) => setEnrollments(data))
    .catch((error) => console.error('Error fetching enrollments:', error));
}, []);
  return (
    <div>
      <h1>All Enrollments</h1>
      {/* Pass grouped enrollments to EachEnrollments component */}
      <EachEnrollments enrollments={enrollments} />
    </div>
  );
}

export default ViewEnrollments;
