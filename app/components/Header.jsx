import React from "react";
import logo from "../../public/whisper.svg";
import profile from "/public/profile.jpg";
import Link from "next/link";
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
      <div className="h-16 w-16 bg-rose-900 rounded-full absolute right-8">
        <Link href="/profile">
          <Image
            src={profile}
            alt="logo"
            height={70}
            width={70}
            quality={100}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
