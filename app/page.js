"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../public/whisper.svg";
import Header from "./components/Header";
import Loading from "./components/Loading";
const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <div className="h-screen w-screen text-center flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default Page;
