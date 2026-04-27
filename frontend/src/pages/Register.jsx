import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterImage from "../assets/Register.webp"; // same image use kar sakte ho

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering user:", { name, email, password, confirmPassword });
  }
  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDE FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        
        <form
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">
            Create Account ✨
          </h2>

          <p className="text-center mb-6 text-gray-500">
            Fill in the details to register
          </p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Confirm password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Register
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>

        </form>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-100">
        <img
          src={RegisterImage}
          alt="Register"
          className="h-[700px] w-full object-cover"
        />
      </div>

    </div>
  );
};

export default Register;