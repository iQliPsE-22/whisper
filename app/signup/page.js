"use client";
import React, { useState } from "react";
import "../login/login.css";
import Link from "next/link";
import dynamic from "next/dynamic";
const Button = dynamic(() => import("../components/Button"), { ssr: false });

const Page = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Successful");
      const response = await fetch(
        "https://server-lovat-sigma.vercel.app/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await response.json();

      console.log(data);
      setUser({ name: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="h-dvh flex flex-row items-center">
        <div className="h-dvh w-dvw text-white-500 text-center p-10">
          <h1 className="text-lg p-5" id="title">
            Sign Up
          </h1>
          <form className="mt-7 text-black" onSubmit={handleFormSubmit}>
            <input
              type="text"
              className="text-input"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
            />
            <br />
            <input
              type="email"
              name="Email"
              className="text-input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              className="text-input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Passoword"
            />
            <div className="mt-28 btn">
              <Button
                name="Sign Up"
                bg="white"
                color="black"
                onClick={handleFormSubmit}
              />
              <Link href="/login">
                <Button name="Login" bg="#1A1A1A" color="#898989" />
              </Link>
              <Button
                name="Terms and Conditions"
                bg="transparent"
                color="#898989"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
