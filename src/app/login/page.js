"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function LoginPage() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error messages
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect
      email,
      password,
    });

    if (result.error) {
      setError(result.error); // Set error message if login fails
    } else {
      router.push("/"); // Redirect to home page on successful login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">Login</button>
      </form>
    </div>
  );
}
