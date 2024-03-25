"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { imagefrombuffer } from "imagefrombuffer";

import Chat from "./../components/Chat";
import { useUser } from "../UserContext";
import Button from "./../components/Button";
import img from "../../public/pic.jpg";
import io from "socket.io-client";
import { Head } from "next/head";

const Page = ({ params }) => {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [friend, setFriend] = useState({});
  const sender = userData.user?.name || "";
  const recipient = params.chatPage;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    var socket = io("http://localhost:3000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocket(socket);
    socket.on("connect", () => {
      console.log("Connected to the server!");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server!");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessages = (e) => {
    e.preventDefault();
    const message = e.target[0].value.trim();
    if (!message || !socket) return; // Add null check for socket
    const date = new Date(); // Get the current time
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`; // Format the time
    try {
      if (socket) {
        socket.emit("chat message", {
          message,
          sender,
          recipient,
          time,
        });
      }
      e.target[0].value = "";
      window.scrollTo(0, document.body.scrollHeight);
      console.log("Message sent", message, recipient, sender, time);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("chat message", (msg) => {
      console.log("Message received from server:", msg);
      const message = {
        message: msg.message,
        sender: msg.sender,
        recipient: msg.recipient,
        time: msg.time,
      };
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
      socket.off("fetch messages");
    };
  }, [socket]);

  const fetchMessages = () => {
    if (!socket) return;
    socket.emit("fetch messages", { sender: sender, recipient: recipient });
  };

  useEffect(() => {
    if (!socket) return;
    fetchMessages();
    socket.on("messages fetched", (messages) => {
      console.log("Messages fetched:", messages);
      setMessages(messages);
    });

    return () => {
      socket.off("messages fetched");
    };
  }, [socket]);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/search");
      const data = await response.json();
      const foundFriend = data.find((friend) => friend.name === recipient);
      setFriend(foundFriend);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(messages);
  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
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

      <div
        className={`text-white max-w-screen h-screen m-4 mb-16 flex flex-col h-4/5 mb-32 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`bg-[#1A1A1A] m-2 border-2 rounded-e-2xl rounded-l rounded-bl-3xl p-0 ${
              msg.sender === sender
                ? "border-rose-500 self-end"
                : "border-green-500 self-start"
            }`}
            style={{
              minWidth: "fit-content",
              minHeight: "fit-content",
              width: `${msg.message.length * 10}px`,
              Height: "fit-content",
              maxWidth: "50%",
            }}
          >
            <h1 className="m-8 text-center font-xl">{msg.message} </h1>
            <span className="m-8 text-right text-gray-700 font-sm">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 overflow-x-hidden ">
        <form onSubmit={handleMessages}>
          <input
            type="text"
            className="w-screen h-12 p-2 text-black border-2 border-rose-500 outline-none rounded"
          />
          <div className="bg-black w-screen">
            <Button
              name="Send"
              color="white"
              type="submit"
              bg="black"
              onClick={scrollToBottom}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
