import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="mt-4 text-2xl">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
