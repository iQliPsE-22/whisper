import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Chat = ({ userName, imgSrc, setCurrentChat,bg }) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  const handleLinkClick = () => {
    setCurrentChat(userName);
    console.log("Setting currentchat to", userName);
  };

  const bgColor = bg || "bg-[#282828]";

  return (
    <>
      <Link
        href={`/chatPage-${userName}`}
        as={`/${encodeURIComponent(userName)}`}
        passHref
        className={`lg:hidden h-13 lg:h-16 ${bgColor} flex items-center mb-1 p-3 rounded-lg cursor-pointer shadow shadow-lg`}
        onClick={handleLinkClick}
      >
        <Image
          src={imgSrc}
          alt="dp"
          width={36}
          height={36}
          className="h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center object-cover overflow-hidden"
          quality={100}
          priority={true}
          onClick={handleImageClick}
        />
        <h3 className="ml-4 text-white text-sm lg:text-md ">
          {userName}
        </h3>
      </Link>
      <div
        className={`hidden lg:flex h-13 lg:h-16 ${bgColor} text-red-500items-center mb-1 p-3 rounded-lg cursor-pointer shadow shadow-lg`}
        onClick={handleLinkClick}
      >
        <Image
          src={imgSrc}
          alt="dp"
          width={36}
          height={36}
          className="h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center object-cover overflow-hidden"
          quality={100}
          priority={true}
          onClick={handleImageClick}
        />
        <h3 className="ml-4 text-white text-sm lg:text-md ">
          {userName}
        </h3>
      </div>
    </>
  );
};

export default Chat;
