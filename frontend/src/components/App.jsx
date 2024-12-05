import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;