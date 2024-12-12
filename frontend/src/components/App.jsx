import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Students from './StudentDashboard';
import Instructor from './InstructorDashboard';
import Admin from './AdminDashboard';
import ViewCourses from './ViewCourses';
import ShowStudents from './ShowStudents';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/student-dashboard" element={<Students />} />
          <Route path="/instructor-dashboard" element={<Instructor />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/admin-dashboard/view-courses" element={<ViewCourses />} />
          <Route path="/admin-dashboard/view-students" element={<ShowStudents />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;