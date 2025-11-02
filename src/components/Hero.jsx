
import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-gray-800 text-white">
      <div className="absolute inset-0">
        {/* You can add a background image here */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Avotak Africa Ltd
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl sm:max-w-3xl">
          Your trusted partner in agricultural consulting and premium farm produce.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
            <Link
              to="/produce"
              className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-green-700 sm:px-8"
            >
              Our Produce
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-50 sm:px-8"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
