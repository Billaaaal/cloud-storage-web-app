import React from 'react';
import { BrowserRouter as Router, Routes , Route, Link, BrowserRouter, useLocation } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import LandingPage from './LandingPage/LandingPage'
import LoginPage from './LoginPage/LoginPage'
import SignupPage from './SignupPage/SignupPage'
import DashboardPage from './DashboardPage/DashboardPage'

//import LinkPage from './LinkPage/LinkPage'
//import Create from './Create/Create'



//comment inside tsx file



function App() {
  
 
  return (
    
    <div className="wrapper">
      <Routes>
        <Route path="" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>



      </Routes>
    </div>

  //<Route path="" element={<p>Create your LinkStock now</p>}/>
  //<Route path="*" element={<p>Welcome to {useLocation().pathname.replace("/", "")}'s LinkStock</p>}/>
    
    
  );
}

export default App;
