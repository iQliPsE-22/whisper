import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

const Chat = (props) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };
  
  const bgColor = props.bg || "bg-[#282828]";
  const btnColor =
    props.bg === "bg-[#e11d48]" ? "bg-[#282828]" : "bg-[#e11d48]";

  return (
    <Link
      href={`/chatPage-${props.userName}`}
      as={`/${encodeURIComponent(props.userName)}`}
    >
      <div
        className={`h-18 lg:h-20 ${bgColor} flex items-center justify-between mb-1 cursor-pointer`}
      >
        <div className="dp ml-4 flex items-center">
          <Image
            src={props.imgSrc}
            alt="dp"
            width={isImageClicked ? 200 : 48}
            height={isImageClicked ? 200 : 50}
            className="rounded-full"
            quality={100}
            priority={true}
            onClick={handleImageClick}
          />
          <h3 className="ml-4">{props.userName}</h3>
        </div>
        <div className="flex justify-end">
          {props.show && (
            <div className="mr-4">
              <button className={`${btnColor} p-2 w-32 rounded`}>Add</button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Chat;
