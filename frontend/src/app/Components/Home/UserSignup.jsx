"use client";
import { AuthContext } from "@/app/context/AuthContext";
import React, { useContext, useState } from "react";

export const Signup = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const { Usersignup } = useContext(AuthContext);

  async function handleSubmit() {
    try {
      const { username, email, password, confirmPassword } = formData;
      if (username && email && password && confirmPassword) {
        if (password === confirmPassword) {
          const status = await Usersignup(formData);
          if (status === 200) {
            setMode("signin");
          }
        } else {
          alert("Passwords do not match");
        }
      } else {
        alert("Please fill out the form");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left side - Welcome Text */}
        <div className="bg-blue-100 flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-3xl font-bold text-blue-700">
            Create Account 🚀
          </h2>
          <p className="text-blue-600 mt-4 text-sm">
            Take control of your spending.
            <br />
            Track, manage, and thrive financially with us!
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Welcome"
            className="w-40 mt-6"
          />
        </div>

        {/* Right side - Signup Form */}
        <div className="p-10 flex flex-col justify-center">
          <h3 className="text-yellow-500 text-2xl font-bold text-center mb-6">
            Sign Up
          </h3>

          <input
            type="text"
            placeholder="Username"
            className="mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-4 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />

          <label className="text-sm text-gray-600 font-medium mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            className="mb-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-yellow-400 file:text-white file:font-semibold hover:file:bg-yellow-500"
            onChange={(e) => {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(e.target.files[0]);
              fileReader.onload = (e) => {
                setFormData((prev) => ({
                  ...prev,
                  ProfilePicture: e.currentTarget.result,
                }));
              };
            }}
          />

          {formData.ProfilePicture && (
            <div className="text-center mb-4">
              <img
                src={formData.ProfilePicture}
                className="rounded-full w-28 h-28 object-cover border-4 border-yellow-400 mx-auto"
                alt="Profile Preview"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-full transition"
          >
            Signup
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">Already have an account?</p>
            <button
              onClick={() => setMode("signin")}
              className="text-blue-600 font-semibold hover:underline mt-1"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
