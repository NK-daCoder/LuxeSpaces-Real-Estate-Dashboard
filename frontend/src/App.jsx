import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AgentDashboard from './pages/agent/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Profile from './pages/Profile';
import LoginAdmin from './pages/admin/LoginAdmin';
import RegisterAdmin from './pages/admin/RegisterAdmin';


const App = () => {
  // autodetect user role based on localStorage
  const isAgent = localStorage.getItem("is_agent") === true || localStorage.getItem("is_agent") === "true";
  const role = isAgent ? "agent" : "admin";
  console.log("isAgent", isAgent);
  console.log("role", role);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={`/complete-profile`} element={<Profile role={`${role}`}/>} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />
        <Route path="/agent/dashboard" element={<AgentDashboard/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  )
}

export default App