import React from "react";
import logo from "../../public/whisper.svg";
import Image from "next/image";
const Header = () => {
  const imageStyle = {
    borderRadius: "50%",
    border: "1px solid #fff",
  };
  return (
    <div className="mt-2 flex justify-center">
      <header>
        <Image
          src={logo}
          alt="logo"
          height={70}
          width={70}
          quality={100}
          style={imageStyle}
        />
      </header>
    </div>
  );
};

export default Header;
