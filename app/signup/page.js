import React from "react";
import Image from "next/image";
import img from "../Assets/astronaut-4106766.jpg";
import Button from "../Components/Button.jsx";
import "../login/login.css";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-dvh flex flex-row items-center">
      <div className="h-dvh w-dvw text-white-500 text-center p-10">
        <h1 className="text-lg p-5" id="title">
          Sign Up
        </h1>
        <form className="mt-7">
          <input
            type="text"
            name="user"
            className="text-input"
            placeholder="Name"
          />
          <br />
          <input
            type="mail"
            name="Email"
            className="text-input"
            placeholder="Email"
          />
          <br />
          <input
            type="password"
            name="password"
            className="text-input"
            placeholder="Passoword"
          />
          <div className="mt-28 btn">
            <Button name="Sign Up" bg="white" color="black" />
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
  );
};

export default page;
