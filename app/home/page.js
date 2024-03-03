"use client";
import React from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Image from "next/image";

const friend = {
  name: "John",
  email: "john@gmail.com",
  dp: "/pic2.png",
};

const friend2 = {
  name: "Jane",
  email: "jane@gmail.com",
  dp: "/pic.jpg",
};

const page = () => {
  return (
    <>
      <div>
        <Chat imgSrc={friend.dp} userName={friend.name} />
        <Chat imgSrc={friend2.dp} userName={friend2.name} />
      </div>
    </>
  );
};

export default page;
