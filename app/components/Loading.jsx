import React from "react";
import logo from "../../public/whisper.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen w-screen text-center flex items-center justify-center z-100">
      <div className="logo">
        <Image src={logo} alt="logo" height={500} width={500} />
      </div>
    </div>
  );
};

export default Loading;
