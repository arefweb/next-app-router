'use client';

import React from 'react';

function Login() {
  return (
    <div className="flex justify-center items-center grow shrink-0 basis-[100vh]">
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/3">
        <h3 className="text-md font-bold mb-2 ">Login Form</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('login form >> ', e);
          }}
          className="flex flex-col gap-x-4 gap-y-4"
        >
          <input type="email" placeholder="Email Address" className="border border-gray-300 rounded-md p-2" />
          <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2" />
          <button
            type="button"
            className="border border-gray-400 rounded-md p-2
            cursor-pointer bg-green-400 hover:bg-green-500 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;