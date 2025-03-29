"use client"; 

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function FormPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const [error, setError] = useState(''); 
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoginInProgress(true);
        setError(""); // Reset error state

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false, // ✅ Prevent page reload
        });

        if (res?.error) {
            setError("Invalid credentials!"); // ✅ Show error
            setLoginInProgress(false);
        } else {
            window.location.href = "/"; // ✅ Redirect manually
        }
    };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        {/* Email Field */}
        <input
          type="email" placeholder="email" value={email}
          disabled={loginInProgress}
          required
          onChange={ev => {
            setEmail(ev.target.value);
          }}
        />

        {/* Password Field */}
        <input
          type="password" placeholder="password" value={password}
          disabled={loginInProgress}
          required
          onChange={ev => {
            setPassword(ev.target.value);
          }}
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$"
        />

        <button type="submit">Login</button>  

        <div className="text-center my-4 text-gray-500 border-t pt-4">
            New user?{' '}
            <Link className="underline" href={'/register'}>Register here &raquo;</Link>
        </div>     
      
      </form>
    </section>
  );
}
