"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { useUser } from "../UserContext";
import Chat from "./../components/Chat";
import Button from "./../components/Button";
import ChatBox from "./../components/ChatBox";

const Chatpage = ({ currentChat }) => {
  const router = useRouter();
  const { userData } = useUser();
  const [friend, setFriend] = useState({});
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const sender = userData.name || "";
  const recipient = currentChat;

  useEffect(() => {
    const newSocket = io("https://hush-server.onrender.com", {
      transports: ["websocket", "polling", "flashsocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => console.log("Connected to the server!"));
    newSocket.on("disconnect", () =>
      console.log("Disconnected from the server!")
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !recipient) return;

    socket.emit("fetch messages", { sender, recipient });

    const handleFetchedMessages = (fetchedMessages) => {
      console.log("Messages fetched:", fetchedMessages);
      setMessages(fetchedMessages);
    };

    socket.on("messages fetched", handleFetchedMessages);

    return () => socket.off("messages fetched", handleFetchedMessages);
  }, [socket, recipient]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      console.log("Message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("chat message", handleNewMessage);

    return () => socket.off("chat message", handleNewMessage);
  }, [socket]);

  useEffect(() => {
    const friendData = userData?.allusers?.find(
      (friend) => friend.name === recipient
    );
    console.log("friend Data", friendData);
    setFriend(friendData || {});
  }, [userData, recipient]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessages = (e) => {
    e.preventDefault();
    if (!socket) return;

    const message = e.target[0].value.trim();
    if (!message) return;

    const date = new Date();
    const time = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const newMessage = { message, sender, recipient, time };

    socket.emit("chat message", newMessage);

    e.target[0].value = "";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="lg:p-2 pb-0">
      <Chat
        imgSrc={friend?.profilePicture}
        userName={friend?.name}
        bg="bg-[#e11d48]"
      />

      <div className="text-white h-fit m-4 mb-16 flex flex-col pb-8">
        {messages.map((msg, index) => (
          <div key={index} className="w-full">
            <ChatBox msg={msg} sender={sender} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleMessages}
        className="w-full lg:w-[73%] fixed bottom-0 pb-0 p-4 gap-2 flex flex-row bg-black"
      >
        <input
          type="text"
          className="w-full h-12 p-2 text-black border-2 border-rose-500 outline-none rounded"
        />
        <input
          type="submit"
          className="text-white bg-[#282828] rounded-lg w-1/3 cursor-pointer"
          value="Send"
        />
      </form>
    </section>
  );
};

export default Chatpage;
