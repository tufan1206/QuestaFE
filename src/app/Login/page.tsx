"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
    const router = useRouter();
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await axios.post( `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/login`, form);
    console.log(res);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.user.name);
    console.log(res.data.token);
    //alert("Logged in!");
    //window.location.href = "/home";
    console.log("logged in");
    router.push('/Quiz');
  };
  const [form, setForm] = useState({ email: "", password: "" });
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-blue-100">
        <form
          onSubmit={handleSubmit} className="bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-md shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl mb-4 text-center font-medium">Login</h2>
          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 w-full mb-3 rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="bg-blue-500 text-white w-full p-2 rounded cursor-pointer">
            Login
          </button>
          <p className="mt-4 text-center text-sm">
            Don&apos;t registered?{" "}
            <Link
              href="/Register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
