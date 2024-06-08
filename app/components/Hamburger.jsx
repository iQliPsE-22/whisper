"use client";
import React, { useEffect } from "react";
import Button from "../components/Button";
import { useUser } from "../UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import close from "../../public/close.png";

const Hamburger = ({ isOpen, onClose }) => {
  const { setUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (!target.closest(".hamburger-menu")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleLogout = () => {
    setUserData(null);
    onClose();
    router.push("/login");
  };

  return (
    <div
      className={`fixed top-0 h-full bg-black text-white p-4 w-10/12 lg:w-1/3 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } hamburger-menu`}
    >
      <h1 className="julius text-2xl text-center p-4 underline">
        LOST YOUR WAY?
      </h1>
      <div className="absolute top-4 right-4">
        <Image
          src={close}
          alt="close"
          onClick={onClose}
          className="h-8 w-8 cursor-pointer m-2"
        />
      </div>
      <div className=" h-full flex flex-col justify-around">
        <ul className="h-fit flex flex-col justify-between ">
          <div className="p-4 julius text-center">
            <Link
              href="/home"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Search
            </Link>

            <Link
              href="https://www.iqlipse.studio/"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </ul>
        <div className="julius">
          <Link
            href="/profile"
            className="block text-center m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
          >
            <button className="julius">Profile</button>
          </Link>
          <Link
            href="/login"
            className="block text-center m-4 bg-red-600 p-3 rounded hover:bg-red-700 cursor-pointer"
          >
            <button onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
