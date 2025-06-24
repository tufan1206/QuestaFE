"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'

const Page = () => {

const [form, setForm] = useState({ name: "", email: "", password: "" });

const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await axios.post( `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/register`, form);
    alert("Registered Successfully!");
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl mb-4 text-center font-medium">Register</h2>
        <input 
          className="border p-2 w-full mb-3 rounded" 
          placeholder="Name" 
          onChange={e => setForm({ ...form, name: e.target.value })} 
        />
        <input 
          className="border p-2 w-full mb-3 rounded" 
          placeholder="Email" 
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          type="password" 
          className="border p-2 w-full mb-4 rounded" 
          placeholder="Password" 
          onChange={e => setForm({ ...form, password: e.target.value })} 
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded cursor-pointer">Register</button>

        <p className="mt-4 text-center text-sm">
            Already registered?{" "}
            <Link
              href="/Login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
      </form>
    </div>
  )
}

export default Page
