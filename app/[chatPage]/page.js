import React from "react";
import Chatpage from "./../components/Chatpage";

const page = ({ params }) => {
  const recipient = params.chatPage;
  console.log("recipient", recipient);
  return <Chatpage currentChat={recipient} />;
};

export default page;
