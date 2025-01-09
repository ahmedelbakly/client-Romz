import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ element, user }) {
  if (!user) {
    // If no user is authenticated, redirect to the sign-in page
    return <Navigate to="/" />;
  }

  // If user is authenticated, render the protected route
  return element;
}

export default PrivateRoute;
