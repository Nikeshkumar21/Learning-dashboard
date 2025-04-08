import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
    // Get the user's role from localStorage or another auth source
    const userRole = localStorage.getItem('role');

    // Check if the user role is allowed
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // Redirect to login if not authorized
    }

    return children; // Render the protected component
};

export default ProtectedRoute;
