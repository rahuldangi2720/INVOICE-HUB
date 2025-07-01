"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export const Signin = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const { Usersignin, dispatch, AuthData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (AuthData?.token) {
      router.push("/pages/Home");
    }
  }, [AuthData]);

  async function handleSubmit() {
    try {
      if (formData?.email && formData?.password) {
        const data = await Usersignin(formData);
       
        
        if (data) {
          
          dispatch({ type: "SIGN_IN", payload: data });
        } else {
          alert("Invalid Email or Password");
        }
      } else {
        alert("Please fill out all fields.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section */}
        <div className="bg-blue-100 flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-3xl font-bold text-blue-700">Welcome Back 👋</h2>
          <p className="text-blue-600 mt-4 text-sm">
            Manage your expenses effortlessly with our intuitive tracker.
            <br />
            Stay in control and hit your financial goals!
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2983/2983788.png"
            alt="Welcome Illustration"
            className="w-40 mt-6"
          />
        </div>

        {/* Right Section */}
        <div className="p-10 flex flex-col justify-center">
          <h3 className="text-yellow-500 text-2xl font-bold text-center mb-6">
            Sign In
          </h3>

          <label className="text-gray-700 font-medium text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <label className="text-gray-700 font-medium text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            className="mb-6 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-full transition"
          >
            Sign In
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">Don't have an account?</p>
            <button
              onClick={() => setMode("signup")}
              className="text-blue-600 font-semibold hover:underline mt-1"
            >
              Sign up here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
