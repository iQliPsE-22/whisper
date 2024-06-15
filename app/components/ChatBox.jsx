import React from "react";
import "./chatBox.css";
const ChatBox = ({ msg, sender }) => {
  const isEmoji = msg.message.match(/\p{Emoji}/gu);

  return (
    <div className="text-white w-full m-2 flex flex-col items-start">
      <div
        className={`text-box break-words w-fit block min-h-fit bg-[#1A1A1A] m-2 border-2 p-0 ${
          msg.sender === sender
            ? "border-rose-500 self-end rounded-l-lg rounded-b-lg rounded-br-2xl"
            : "border-green-500 self-start rounded-e-2xl rounded-l rounded-bl-3xl"
        }`}
      >
        <h1 className={`p-4 text-center font-xl ${isEmoji ? "text-4xl" : ""}`}>
          {msg.message}
        </h1>
        <div className="w-full text-center text-center text-gray-700 font-sm">
          {msg.time}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
