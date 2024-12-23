import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Students from './StudentDashboard';
import Instructor from './InstructorDashboard';
import Admin from './AdminDashboard';
import ViewCourses from './ViewCourses';
import ShowStudents from './ShowStudents';
import ViewEnrollments from './ViewEnrollments';
import ViewInstructors from './ViewInstructors';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/student-dashboard/:id" element={<Students />} />
          <Route path="/instructor-dashboard/:id" element={<Instructor />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/admin-dashboard/view-courses" element={<ViewCourses />} />
          <Route path="/admin-dashboard/view-students" element={<ShowStudents />} />
          <Route path="/admin-dashboard/view-enrollments" element={<ViewEnrollments />} />
          <Route path="/admin-dashboard/view-instructors" element={<ViewInstructors />} />
          <Route path="/student-dashboard" element={<div>No student selected</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;