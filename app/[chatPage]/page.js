"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Chat from "./../components/Chat";
import { useUser } from "../UserContext";
import Button from "./../components/Button";
import img from "../../public/pic.jpg";
import io from "socket.io-client";
import ChatBox from "./../components/ChatBox";

const Page = ({ params }) => {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [friend, setFriend] = useState({});

  const sender = userData.name || "";

  const recipient = params.chatPage;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    var socket = io("https://hush-server.onrender.com", {
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
      const response = await fetch("https://hush-server.onrender.com/search");
      const data = await response.json();
      const foundFriend = data.find((friend) => friend.name === recipient);
      if (foundFriend && foundFriend.profilePicture) {
        const blob = new Blob(
          [new Uint8Array(foundFriend.profilePicture.data.data)],
          { type: foundFriend.profilePicture.contentType }
        );
        foundFriend.profilePicture = URL.createObjectURL(blob);
      }
      setFriend(foundFriend);
      console.log("Friend data:", foundFriend);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    scrollToBottom();
  }, [messages.length]);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <>
      <div>
        <Chat
          imgSrc={friend?.profilePicture}
          userName={friend?.name}
          bg="bg-[#e11d48]"
        />
      </div>

      <div
        className={`text-white max-w-screen h-4/5 m-4 mb-16 flex flex-col h-4/5 mb-32 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {messages.map((msg, index) => (
          <div key={index} className="w-full">
            <ChatBox key={index} msg={msg} sender={sender} />
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
              bg="#282828"
              onClick={scrollToBottom}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
