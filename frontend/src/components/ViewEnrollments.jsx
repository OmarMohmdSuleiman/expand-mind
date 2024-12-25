import React, { useState, useEffect } from "react";
import EachEnrollments from "./EachEnrollment";

function ViewEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:4000/enrollments", {
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token in the request header
        },
      })
      .then((response) => {
        if (response.status === 403) {
          console.error("Access forbidden. User is not authorized.");
          return;
        }
        return response.json();
      })
      .then((data) => setEnrollments(data))
      .catch((error) => console.error('Error fetching enrollments:', error));
    }
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
