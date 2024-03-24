"use client";
import Link from "next/link";
import Chat from "./../components/Chat";
import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { useRouter } from "next/navigation";
import Button from "./../components/Button";
import { imagefrombuffer } from "imagefrombuffer";
import img from "../../public/pic.jpg";
import io from "socket.io-client";

const Page = ({ params }) => {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [friend, setFriend] = useState({});
  const user = userData.user?.name || "";
  const partner = params.chatPage;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    var socket = io("http://localhost:3000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    setSocket(socket);
    console.log(socket);
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
    try {
      if (socket) {
        socket.emit("chat message", {
          message,
          user,
          partner,
        });
        setMessages([...messages, { message, sender: user }]);
      }
      e.target[0].value = "";
      console.log("Message sent", message, partner, user);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  useEffect(() => {
    if (!socket) return;
    console.log(socket);
    socket.on("chat message", (msg) => {
      console.log("Message received from server:", msg);
      setMessages([...messages, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
    };
  }, [socket]);

  const fetchMessages = () => {
    if (!socket) return;
    socket.emit("fetch messages", { user, partner });
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("messages fetched", (messages) => {
      setMessages(messages);
    });
    fetchMessages(); 
    return () => {
      // Clean up event listener
      socket.off("messages fetched");
    };
  }, [socket]);

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/search");
      const data = await response.json();
      const foundFriend = data.find((friend) => friend.name === partner);
      setFriend(foundFriend);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchMessages();
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className=" bg-[#1A1A1A]  m-2 border-2 border-rose-500 rounded-e-2xl rounded-l rounded-bl-3xl min-w-14"
            style={{
              minWidth: "fit-content",
              width: `${msg.message.length * 10}px`,
              maxWidth: "50%",
            }}
          >
            <h1 className="m-8 text-center">{msg.message}</h1>
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
