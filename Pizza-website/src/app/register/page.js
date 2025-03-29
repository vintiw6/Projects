"use client"; 

import Link from "next/link";
import { useState } from "react";

export default function FormPage() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [creatingUser, setCreatingUser] = useState(false); 
  const [userCreated, setUserCreated] = useState(false); 
  const [error, setError] = useState(false); 

  const handleEmailInput = (e) => {
    const value = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let errorMessage = ""; 

    if (!value) {
      errorMessage = "Please fill out this field.";
    } else if (!emailPattern.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else {
      errorMessage = "";
    }

    setEmailError(errorMessage);
    e.target.setCustomValidity(errorMessage);

  };

  const handlePasswordInput = (e) => {
    const value = e.target.value;
    let errorMessage = "";

    if (!value) {
      errorMessage = "Please fill out this field.";
    } else if (!/[a-z]/.test(value)) {
      errorMessage = "Password must contain at least one lowercase letter.";
    } else if (!/[A-Z]/.test(value)) {
      errorMessage = "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(value)) {
      errorMessage = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errorMessage = "Password must contain at least one special character.";
    } else if (value.length < 8) {
      errorMessage = "Password must be at least 8 characters long.";
    }

    setPasswordError(errorMessage);
    e.target.setCustomValidity(errorMessage); // Set the custom validity error message
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreatingUser(true); 
    setError(false); 
    setUserCreated(false); 

    if (emailError === "" && passwordError === "") {
      console.log("Form is valid and ready to submit!");
    
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
    
      if (response.ok) {
        setUserCreated(true); 
      } else {
        setError(true); 
      }
    }

    setCreatingUser(false); 

  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Register
      </h1>

      { userCreated && (
        <div className="my-4 text-center">
            User created. <br />
            Now you can{' '}
            <Link className="underline" href={'/login'}>
                Login &raquo;
            </Link>
        </div>
      )}

      { error && (
        <div className="my-4 text-center">
            An error has occurred. <br />
            Please try again later
        </div>
      )}

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        {/* Email Field */}
        <input
          type="email" placeholder="email" value={email}
          disabled={creatingUser}
          required
          onChange={ev => {
            setEmail(ev.target.value);
            handleEmailInput(ev); 
          }}
        />

        {/* Password Field */}
        <input
          type="password" placeholder="password" value={password}
          disabled={creatingUser}
          required
          onChange={ev => {
            setPassword(ev.target.value);
            handlePasswordInput(ev); 
          }}
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$"
        />

        <button type="submit">Register</button>      

        <div className="text-center my-4 text-gray-500 border-t pt-4">
            Existing account?{' '}
            <Link className="underline" href={'/login'}>Login here &raquo;</Link>
        </div> 
      
      </form>
    </section>
  );
}