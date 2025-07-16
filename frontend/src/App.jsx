import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AgentDashboard from './pages/agent/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Profile from './pages/Profile';
import LoginAdmin from './pages/admin/LoginAdmin';
import RegisterAdmin from './pages/admin/RegisterAdmin';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/client/Homepage';


const App = () => {
  // autodetect user role based on localStorage
  const isAgent = localStorage.getItem("is_agent") === true || localStorage.getItem("is_agent") === "true";
  const role = isAgent ? "agent" : "admin";
  console.log("isAgent", isAgent);
  console.log("role", role);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/agent/login" element={<Login />} />
        <Route path="/agent/register" element={<Register />} />
        <Route path={`/complete-profile`} element={<PrivateRoute><Profile role={`${role}`}/></PrivateRoute>} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />
        <Route 
          path="/agent/dashboard" 
          element={
            <PrivateRoute allowedRoles={['agent']}>
              <AgentDashboard />
            </PrivateRoute>
          } 
          />
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        
      </Routes>
    </Router>
  )
}

export default App