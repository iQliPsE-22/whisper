import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Chat = (props) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  const bgColor = props.bg || "bg-[#282828]";

  return (
    <Link
      href={`/chatPage-${props.userName}`}
      as={`/${encodeURIComponent(props.userName)}`}
      passHref
      className={`h-15 lg:h-20 ${bgColor} flex items-center mb-1 p-2 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full flex items-center justify-center overflow-hidden">
        <Image
          src={props.imgSrc}
          alt="dp"
          width={64}
          height={64}
          className="rounded-full"
          quality={100}
          priority={true}
          onClick={handleImageClick}
        />
      </div>
      <h3 className="ml-4 text-white text-sm sm:text-lg ">{props.userName}</h3>
    </Link>
  );
};

export default Chat;
