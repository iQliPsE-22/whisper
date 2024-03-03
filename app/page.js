"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import logo from "../public/whisper.svg";
import Header from "./components/Header";
const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 2500);
    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <div className="h-screen w-screen text-center flex items-center justify-center">
      <div className="logo">
        <Image src={logo} alt="logo" height={500} width={500} />
      </div>
    </div>
  );
};

export default Page;
