"use client";
import React from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Image from "next/image";
import { Head } from "next/head";

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

const page = () => {
  return (
    <>
      <Header />
      <div className = "mt-1">
        <Chat imgSrc={friend.dp} userName={friend.name} />
        <Chat imgSrc={friend2.dp} userName={friend2.name} />
      </div>
    </>
  );
};

export default page;
