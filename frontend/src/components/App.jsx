import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Students from './StudentDashboard';
import Instructor from './InstructorDashboard';
import Admin from './AdminDashboard';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;