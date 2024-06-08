"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/whisper.svg";
import profile from "/public/profile.jpg";
import { useUser } from "../UserContext";
import { imagefrombuffer } from "imagefrombuffer";
import Hamburger from "./Hamburger";
import open from "../../public/open.png"; // Correct import

const Header = () => {
  const { userData } = useUser();
  const [showHamburger, setShowHamburger] = useState(false);

  const user = userData?.user;

  const previewImage = imagefrombuffer({
    type: user?.profilePicture?.contentType || "image/jpeg",
    data: user?.profilePicture?.data?.data || profile,
  });

  const imageStyle = {
    borderRadius: "50%",
    border: "1px solid #fff",
  };

  return (
    <>
      <Hamburger
        isOpen={showHamburger}
        onClose={() => setShowHamburger(false)}
      />
      <div className="flex justify-between items-center p-2 shadow shadow-white	">
        <div className="ml-2 h-10 w-10 md:h-16 md:w-16 rounded-full flex items-center justify-center">
          <button onClick={() => setShowHamburger(!showHamburger)}>
            <Image
              src={open}
              alt="hamburger menu"
              className="h-8 w-8 text-white"
            />
          </button>
        </div>
        <header className="h-10 w-10 md:h-16 md:w-16 rounded-full flex items-center justify-center">
          <span className = "rounded-full h-fit w-fit">
            <Image
              src={logo}
              alt="logo"
              height={70}
              width={70}
              quality={100}
              style={imageStyle}
            />
          </span>
        </header>
        <div className="h-10 w-10 md:h-16 md:w-16 rounded-full flex items-center justify-center">
          <Link href="/profile" >
            <Image
              src={previewImage}
              alt="profile"
              height={70}
              width={70}
              quality={100}
              style={imageStyle}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
