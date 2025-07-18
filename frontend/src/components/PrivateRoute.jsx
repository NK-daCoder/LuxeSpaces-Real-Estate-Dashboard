import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('access_token');
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }

  if (!token || !user) {
    return <Navigate to={`/${allowedRoles[0]}/login`} />;
  }

  const roleAllowed =
    (user.is_admin && allowedRoles.includes('admin')) ||
    (user.is_agent && allowedRoles.includes('agent'));

  if (allowedRoles.length > 0 && !roleAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
