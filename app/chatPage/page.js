"use client";
import React, { useState } from "react";
import Chat from "./../components/Chat";
import Button from "./../components/Button";
import { imagefrombuffer } from "imagefrombuffer";

const Page = () => {
  const [messages, setMessages] = useState([]);
  const handleMessages = (e) => {
    e.preventDefault();
    setMessages([...messages, e.target[0].value]);
    e.target[0].value = "";
  };

  return (
    <>
      <div>
        <Chat userName="iQlipse" href="" />
      </div>
      <div className="text-white max-w-screen min-h-14 m-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className=" bg-[#1A1A1A] p-px m-2 border-2 border-rose-500 rounded-e-2xl rounded-l rounded-bl-3xl min-w-14"
            style={{
              minWidth: "15%",
              width: `${message.length * 10}px`,
              maxWidth: "50%",
            }}
          >
            <h1 className="m-8 text-center">{message}</h1>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 overflow-x-hidden ">
        <form onSubmit={handleMessages}>
          <input
            type="text"
            className="w-screen h-12 text-black border-2 border-rose-500 outline-none"
          />
          <Button name="Send" color="white" type="submit" />
        </form>
      </div>
    </>
  );
};

export default Page;
