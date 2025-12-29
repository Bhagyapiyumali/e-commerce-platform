import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(){
        axios.post("http//localhost:5000/api/users/login",{
            email : email,
            password : password
        })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* logo */}
        <img src='https://www.vecteezy.com/free-vector/free-logo-design'className="rounded-full w-[100px]"/>
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Please login to your account
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder=""
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

