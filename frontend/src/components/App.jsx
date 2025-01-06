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
import Footer from './Footer';
import Unauthorized from './Unauthorized';

function App() {
  return (
    <div>
      
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
          <Route 
            path="/admin-dashboard/view-courses" 
            element={
              <PrivateRoute adminOnly>
                <ViewCourses />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin-dashboard/view-students" 
            element={
              <PrivateRoute adminOnly>
                <ShowStudents />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin-dashboard/view-enrollments" 
            element={
              <PrivateRoute adminOnly>
                <ViewEnrollments />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin-dashboard/view-instructors" 
            element={
              <PrivateRoute adminOnly>
                <ViewInstructors />
              </PrivateRoute>
            } 
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
       </Routes>
      </Router>
    </div>
    <Footer /></div>
  );
}

export default App;