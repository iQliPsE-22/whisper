"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/whisper.svg";
import profile from "/public/profile.jpg";
import { useUser } from "../UserContext";
import { imagefrombuffer } from "imagefrombuffer";
const Header = () => {
  const { userData } = useUser();
  const user = userData.user;
  
  const [previewImage, setPreviewImage] = useState(
    imagefrombuffer({
      type: user?.profilePicture?.contentType || "image/jpeg",
      data: user?.profilePicture?.data?.data || profile,
    })
  );
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
            src={previewImage} // Assuming dp is a valid URL or relative path to an image
            alt="profile"
            height={70}
            width={70}
            quality={100}
            style={imageStyle}
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
