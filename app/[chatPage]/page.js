"use client";
import Link from "next/link";
import Chat from "./../components/Chat";
import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { useRouter } from "next/navigation";
import Button from "./../components/Button";
import { imagefrombuffer } from "imagefrombuffer";
import img from "../../public/pic.jpg";

const Page = ({ params }) => {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [friend, setFriend] = useState({});
  const user = userData.user?.name || "";
  const partner = params.chatPage;
  const [messages, setMessages] = useState([]);

  const handleMessages = async (e) => {
    e.preventDefault();
    if (e.target[0].value === "") return;
    console.log(e.target[0].value, params.chatPage);
    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        body: JSON.stringify({
          message: e.target[0].value,
          sender: user,
          recipient: params.chatPage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log specific data from the response if needed
        setMessages([...messages, e.target[0].value]);
        e.target[0].value = "";
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/search");
      const data = await response.json();
      const foundFriend = data.filter((friend) => friend.name === partner);
      setFriend(foundFriend[0]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching list data:", error);
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/chat");
      if (response.ok) {
        const data = await response.json();
        const filteredData = data.filter(
          (message) =>
            (message.recipient === partner && message.sender === user) ||
            (message.recipient === user && message.sender === partner)
        );
        setMessages(filteredData.map((message) => message.message));
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUser();
  }, []);
  return (
    <>
      <div>
        <Chat
          imgSrc={imagefrombuffer({
            type: friend.profilePicture?.contentType || "image/jpeg",
            data: friend.profilePicture?.data?.data || img,
          })}
          userName={friend.name}
          bg="bg-[#e11d48]"
        />
      </div>
      <div className="text-white max-w-screen h-screen m-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className=" bg-[#1A1A1A]  m-2 border-2 border-rose-500 rounded-e-2xl rounded-l rounded-bl-3xl min-w-14"
            style={{
              minWidth: "fit-content",
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
            className="w-screen h-12 p-2 text-black border-2 border-rose-500 outline-none rounded"
          />
          <Button name="Send" color="white" type="submit" />
        </form>
      </div>
    </>
  );
};

export default Page;
