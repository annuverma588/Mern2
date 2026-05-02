import React from "react";
import { useNavigate } from "react-router-dom";
import MyOrdersPage from "./MyOrdersPage";

const Profile = () => {
  const navigate = useNavigate();

  // ✅ Logout Function
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row gap-6">

          {/* 🔥 LEFT PROFILE CARD */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-2xl p-6">

            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <img
                src="https://img.freepik.com/premium-vector/avatar03_885953-438.jpg?semt=ais_hybrid&w=740&q=80"
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 mb-4"
              />

              <h2 className="text-xl font-semibold">Priya</h2>
              <p className="text-gray-500 text-sm">
                priya@email.com
              </p>
            </div>

            {/* Divider */}
            <hr className="my-5" />

            {/* Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* 📦 RIGHT SIDE (ORDERS) */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6">
              <MyOrdersPage />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;