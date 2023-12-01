import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// return (
//   <Router>
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/homepage" element={<HomePage />} />
//       {/* Other routes */}
//     </Routes>
//   </Router>
// );
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/Login" element={<Login/>} />
      {/* <Route path="/homepage" element={<HomePage />} /> */}
      {/* Other routes */}
      <Route path="/Homepage" element={<Homepage/>} />
    </Routes>
  </Router>
//<div className="blank">

//<Login/>

//</div>
  );
}

export default App;

