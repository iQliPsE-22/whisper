"use client";
import React from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Image from "next/image";
import { Head } from "next/head";
import Link from "next/link";
import "./page.css";

const page = () => {
  return (
    <>
      <Header />
      <div className="mt-1">
       
      </div>
      <div className="sticky bottom-0 bg-[#1E1E1E] w-auto h-16 flex justify-center items-center">
        <Link href="/search">
          <button id="add-btn">Start Whispering </button>
        </Link>
      </div>
    </>
  );
};

export default page;
