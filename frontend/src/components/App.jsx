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
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />

          <Route path='/signup' element={<SignUp />} />
          <Route 
            path="/student-dashboard/:id" 
            element={
              <PrivateRoute>
                <Students />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/instructor-dashboard/:id" 
            element={
              <PrivateRoute>
                <Instructor />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin-dashboard/:id" 
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } 
          />
          <Route path="/admin-dashboard/:id/view-courses" element={<ViewCourses />} />
          <Route path="/admin-dashboard/:id/view-students" element={<ShowStudents />} />
          <Route path="/admin-dashboard/:id/view-enrollments" element={<ViewEnrollments />} />
          <Route path="/admin-dashboard/:id/view-instructors" element={<ViewInstructors />} />
       </Routes>
      </Router>
    </div>
  );
}

export default App;