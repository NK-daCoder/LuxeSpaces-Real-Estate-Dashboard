import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem('access_token');
    const user = null;

    try {
        // Attempt to parse user from localStorage
        user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
    }


    if (!token || !user) {
        return <Navigate to={`/${allowedRoles[0]}/login`} />;
    }

    // If allowedRoles is specified, check if the user's role is permitted
    if (
        allowedRoles.length > 0 &&
        !(
            (user.is_admin && allowedRoles.includes('admin')) ||
            (user.is_agent && allowedRoles.includes('agent'))
        )
    ) {
        return <Navigate to={`/${allowedRoles[0]}/login`} />;
    }

    return children;
}

export default PrivateRoute