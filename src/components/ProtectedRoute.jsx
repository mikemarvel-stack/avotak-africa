
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // This is a simple check. In a real app, you might use a more robust
  // method, like decoding a JWT to check for expiration.
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If a token exists, render the child components (the protected admin layout)
  return children;
};

export default ProtectedRoute;
