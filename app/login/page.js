"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../Components/Button.jsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data.token);
      router.push("/"); // Navigate to the home page
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="h-screen flex flex-row items-center">
      <div className="h-screen w-screen text-white text-center p-10">
        <h1 className="text-lg p-5" id="title">
          Login
        </h1>
        <form className="mt-8" onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="user"
            className="text-input"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br />
          <input
            type="password"
            name="password"
            className="text-input"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <div className="mt-44">
            <Button name="Login" bg="white" color="black" type="submit" />
            <Link href="/signup">
              <Button name="Sign Up" bg="#1A1A1A" color="#898989" />
            </Link>
            <Button name="Forgot Password ?" bg="transparent" color="#898989" />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;
