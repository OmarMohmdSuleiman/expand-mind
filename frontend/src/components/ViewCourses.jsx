import React from "react";

function ViewCourses(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      // Fetch all courses
      fetch('http://localhost:4000/courses')
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error('Error fetching courses:', error));
    }, []);
  
    return (
      <div>
        <h1>All Courses</h1>
        <ul>
          {courses.map((course) => (
            <li key={course.course_id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>Instructor ID: {course.instructor_id}</p>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default ViewCourses;