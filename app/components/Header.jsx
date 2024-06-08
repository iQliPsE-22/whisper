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
      <div className="mt-2 flex justify-between items-center">
        <div className="ml-2">
          <button onClick={() => setShowHamburger(!showHamburger)}>
            <Image
              src={open}
              alt="hamburger menu"
              className="h-8 w-8 text-white"
            />
          </button>
        </div>
        <header className="flex-grow flex justify-center">
          <Image
            src={logo}
            alt="logo"
            height={70}
            width={70}
            quality={100}
            style={imageStyle}
          />
        </header>
        <div className="h-16 w-16 bg-rose-900 rounded-full flex items-center justify-center">
          <Link href="/profile">
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
