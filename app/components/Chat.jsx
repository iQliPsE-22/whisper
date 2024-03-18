import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";

const Chat = (props) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  const handleClick = () => {
    console.log(props.userName);
  };

  const bgColor = props.bg || "bg-[#282828]";
  const btnColor =
    props.bg === "bg-[#e11d48]" ? "bg-[#282828]" : "bg-[#e11d48]";

  return (
    <div
      className={`h-20 ${bgColor} flex items-center justify-between mb-1 cursor-pointer`}
      onClick={handleClick}
    >
      <div className="ml-4 flex items-center">
        <Image
          src={props.imgSrc}
          alt="dp"
          width={isImageClicked ? 200 : 50}
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
  );
};

export default Chat;
