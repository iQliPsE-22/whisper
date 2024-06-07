"use client";
import React,{useState} from "react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Hamburger = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };
  
  return (
    <div className="fixed top-0 h-screen bg-black text-white p-4 w-10/12 lg:w-1/3 z-10">
      <h1 className="julius text-2xl text-center p-4 underline">HUSH</h1>
      <ul className="h-full flex flex-col">
        <div className="p-4 julius text-center ">
          {/* <Link href="/home">
            <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
              Home
            </li>
          </Link>
          <Link href="/dashboard">
            <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
              Dashboard
            </li>
          </Link>
          <Link href="/invoice">
            <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
              Invoice
            </li>
          </Link>
          <Link href="/contact">
            <li className="m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer">
              Contact Us
            </li>
          </Link> */}
        </div>
        <div className="">
          <Button color="#404040" hoverColor="#303030">
            Profile
          </Button>
          <li className="mt-1" onClick={handleLogout}>
            <Button color="red" hoverColor="#ff0000">
              Logout
            </Button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Hamburger;
