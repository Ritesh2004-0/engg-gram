import React from "react";
import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
      <p className="text-gray-600 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
