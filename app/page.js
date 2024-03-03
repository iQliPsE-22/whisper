"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import logo from "./Assets/whisper.svg";
const Page = () => {
  return (
    <div className="h-screen w-screen text-center flex items-center justify-center">
      <div className="logo">
        <Image src={logo} alt="logo" height={500} width={500} />
      </div>
    </div>
  );
};

export default Page;
