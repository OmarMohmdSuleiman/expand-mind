import React, { useState, useEffect } from "react";

function EachStudent({ students }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [message, setMessage] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState({});
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingEnrollments, setIsLoadingEnrollments] = useState(true);

  useEffect(() => {
    // Fetch available courses
    fetch("http://localhost:4000/courses")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("Courses data is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error))
      .finally(() => setIsLoadingCourses(false)); // Set loading to false once done

    // Fetch already enrolled courses for students
    fetch("http://localhost:4000/enrollments")
      .then((response) => response.json())
      .then((data) => {
        const enrollmentMap = data.reduce((map, enrollment) => {
          const { user_id, course_id, course_name } = enrollment;
          if (!map[user_id]) map[user_id] = [];
          map[user_id].push({ course_id, course_name });
          return map;
        }, {});
        setEnrolledCourses(enrollmentMap);
      })
      .catch((error) => console.error("Error fetching enrollments:", error))
      .finally(() => setIsLoadingEnrollments(false)); // Set loading to false once done
  }, []);

  // Handle course selection
  const handleCourseChange = (userId, courseId) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [userId]: courseId,
    }));
  };

  // Handle enrollment
  const handleEnroll = async (userId) => {
    const courseId = selectedCourses[userId];
    const courseIdInt = parseInt(courseId, 10);
    console.log("Selected Course ID:", courseId);
  console.log("Available Courses:", courses);
    if (!courseId) {
      setMessage(`Please select a course for Student ID ${userId}.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, course_id: courseIdInt })
      });

      if (response.ok) {
        const newEnrollment = courses.find(
          (course) => String(course.course_id) === String(courseId)
        );
        if (newEnrollment) {
          setEnrolledCourses((prev) => ({
            ...prev,
            [userId]: [...(prev[userId] || []), newEnrollment],
          }));
          setMessage(`Student ID ${userId} successfully enrolled in Course ID ${courseId}.`);
        } else {
          console.error("Course not found in courses list");
        }
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage || `Failed to enroll Student ID ${userId}.`);
      }
    } catch (error) {
      console.error("Error enrolling student:", error);
      setMessage(`Error enrolling Student ID ${userId}.`);
    }
  };

  return (
    <>
      {isLoadingCourses ? (
        <p>Loading courses...</p>
      ) : isLoadingEnrollments ? (
        <p>Loading enrollments...</p>
      ) : (
        students.map((student) => (
          <li key={student.user_id}>
            <h2>Student name: {student.name}</h2>
            <p>Email: {student.email}</p>
            <div>
              <label htmlFor={`course-${student.user_id}`}>Select Course:</label>
              <select
                id={`course-${student.user_id}`}
                value={selectedCourses[student.user_id] || ""}
                onChange={(e) => handleCourseChange(student.user_id, e.target.value)}
              >
                <option value="">Select a Course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => handleEnroll(student.user_id)}
              disabled={!selectedCourses[student.user_id]} // Disable button if no course is selected
            >
              Enroll in Selected Course
            </button>
            {enrolledCourses[student.user_id]?.length > 0 && (
              <div>
                <h4>Enrolled Courses:</h4>
                <ul>
                  {enrolledCourses[student.user_id].map((course) => (
                    <li key={course.course_id}>{course.course_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))
      )}
    </>
  );
}

export default EachStudent;