import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(){
        axios.post("http://localhost:5000/api/users/login",{
            email : email,
            password : password
        }).then(
            (res)=>{

                console.log(res)
                if(res.data.user=null){
                    alert(res.data.message)
                    return
                }

                localStorage.setItem("token",res.data.token)
                if(res.data.user.type == "admin"){
                    window.location.href ="/admin"
                }else{
                    window.location.href = "/"
                }
            }
        )
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
              placeholder="your email"
              value={email}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={
                (e)=>{setEmail(e.target.value)}
              }
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
              value={password}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={
                (e)=>{setPassword(e.target.value)}
              }
            />
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="w-full bg-blue-600 text-black py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={login}
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

