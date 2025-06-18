"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../Home/Image/logo.png";
import { AuthContext } from "@/app/context/AuthContext";

export default function Navbar({pdfRef}) {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();
  const { AuthData, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    setCurrentDate(today);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "SIGN_OUT" });
    router.push("/");
  };

  return (
    <div ref={pdfRef}>
      <nav className="bg-[#081F4D] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between items-center">
        {/* Left: Logo + Info */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6 w-full md:w-auto">
          <div className="bg-white p-1 rounded-full shadow-lg mb-2 md:mb-0">
            <img
              src={Logo.src}
              alt="Balaji Pump Logo"
              className="h-16 w-16 object-contain rounded-full"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-yellow-400">
              BALA JI PUMP REPAIRE CENTER
            </h1>
            <p className="text-sm text-gray-200">
              SALE & SERVICE | Kh. No. 341, Narela Mandi, Narela, North West, Delhi-40
            </p>
            <p className="text-sm text-gray-300">
              GSTIN: 07JBPPS4526E1Z6 | M: 8396065635 , 9050007895
            </p>
          </div>
        </div>

        {/* Right: Date + Buttons */}
        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0 space-y-2 md:space-y-3">
          <p className="text-sm text-gray-300">Date: {currentDate}</p>

          <div className="hidden md:flex space-x-3">
            <button
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition print:hidden"
              onClick={() => router.push("/pages/History")}
            >
              History
            </button>

            {AuthData.token ? (
              <button
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition print:hidden"
                onClick={handleLogout}
              >
                LogOut
              </button>
            ) : (
              <button
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
                onClick={() => router.push("/pages/Form")}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <button
            className="w-full bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
            onClick={() => router.push("/pages/History")}
          >
            History
          </button>

          {AuthData.token ? (
            <button
              className="w-full bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
              onClick={handleLogout}
            >
              LogOut
            </button>
          ) : (
            <button
              className="w-full bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
              onClick={() => router.push("/pages/Form")}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
    </div>
  );
}
