import React, { useState } from "react";
import Image from "next/image";

const Chat = (props) => {
  const [isImageClicked, setIsImageClicked] = useState(false);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  return (
    <div className="h-20 bg-[#282828] flex items-center mb-1">
      <div className="ml-4">
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
      </div>
      <h3 className="ml-4">{props.userName}</h3>
    </div>
  );
};

export default Chat;