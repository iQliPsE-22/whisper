"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import "./login.css";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";

const Button = dynamic(() => import("../components/Button"), { ssr: false });

const Page = () => {
  const router = useRouter();
  
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { userData, setUserData } = useUser();
  useEffect(() => {
    setUser(null);
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login Attempted");
      const response = await fetch("https://hush-server.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful");
        setUserData(data);
        console.log("userData", userData);
        router.push("/home");
      } else {
        const data = await response.json();
        setError(data.message);
        console.log("Login Failed:", data.message);
      }
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  return (
    <>
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
              required
            />
            <br />
            <input
              type="password"
              name="password"
              className="text-input"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <div className="mt-44">
              <Button name="Login" bg="white" color="black" type="submit" />
              <Link href="/signup">
                <Button name="Sign Up" bg="#1A1A1A" color="#898989" />
              </Link>
              <Button
                name="Forgot Password ?"
                bg="transparent"
                color="#898989"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
