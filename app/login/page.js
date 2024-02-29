import React from "react";
import Image from "next/image";
import img from "../Assets/astronaut-4106766.jpg";
import Button from "../Components/Button.jsx";
import Link from "next/link";

import "./login.css";
const page = () => {
  return (
    <div className="h-dvh flex flex-row items-center">
      <div className="h-dvh w-dvw text-white-500 text-center p-10">
        <h1 className="text-lg p-5" id="title">
          Login
        </h1>
        <form className="mt-7">
          <input
            type="text"
            name="user"
            className="text-input"
            placeholder="Username"
          />
          <br />
          <input
            type="password"
            name="password"
            className="text-input"
            placeholder="Passoword"
          />
          <div className="mt-44 btn">
            <Button name="Login" bg="white" color="black" />
            <Link href="/signup">
              <Button name="Sign Up" bg="#1A1A1A" color="#898989" />
            </Link>
            <Button name="Forgot Password ?" bg="transparent" color="#898989" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
