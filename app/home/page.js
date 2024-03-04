"use client";
import React from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Image from "next/image";
import { Head } from "next/head";
import Link from "next/link";
import "./page.css";
const friend = {
  name: "Deepak",
  email: "john@gmail.com",
  dp: "/pic2.png",
};

const friend2 = {
  name: "Harshit",
  email: "jane@gmail.com",
  dp: "/pic.jpg",
};
const handleSearch = async () => {
  try {
    const response = await fetch("http://localhost:8080/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // Handle the response here
  } catch (error) {
    // Handle any errors here
  }
};
const page = () => {
  return (
    <>
      <Header />
      <div className="mt-1">
        <Chat imgSrc={friend.dp} userName={friend.name} />
        <Chat imgSrc={friend2.dp} userName={friend2.name} />
        <Chat imgSrc={friend.dp} userName={friend.name} />
        <Chat imgSrc={friend2.dp} userName={friend2.name} />
        <Chat imgSrc={friend.dp} userName={friend.name} />
        <Chat imgSrc={friend2.dp} userName={friend2.name} />
        <Chat imgSrc={friend.dp} userName={friend.name} />
        <Chat imgSrc={friend2.dp} userName={friend2.name} />
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
