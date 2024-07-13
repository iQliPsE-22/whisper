"use client";
import React, { useState } from "react";
import "../login/login.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
const Button = dynamic(() => import("../components/Button"), { ssr: false });
import profile from "/public/profile.jpg";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

const Page = () => {
  const [user, setUser] = useState({
    profilePicture: null,
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Successful");
      const formData = new FormData();
      formData.append("profilePicture", user.profilePicture);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      const response = await fetch("https://server-hush.vercel.app/user", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        router.push("/login");
      }
      setUser({ profilePicture: null, name: "", email: "", password: "" });
      if (data.message === "User already exists") {
        console.log("User exists");
        setMessage("User already exists");
      } else if (data.message === "UserName already exists") {
        console.log("UserName exists");
        setMessage("UserName already exists");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const imageStyle = {
    borderRadius: "50%",
    border: "2px solid white",
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setPreviewImage(compressedFile);
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: compressedFile,
        }));
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    }
  };

  return (
    <>
      <div className="h-dvh flex flex-row items-center">
        <div className="h-dvh w-dvw text-white-500 text-center p-10">
          <h1 className="text-lg p-5" id="title">
            Sign Up
          </h1>
          <div className="flex justify-center">
            {previewImage ? (
              <Image
                src={URL.createObjectURL(previewImage)} // Use createObjectURL to display the selected image
                alt="preview"
                height={250}
                width={250}
                style={imageStyle}
              />
            ) : (
              <Image
                src={profile}
                alt="logo"
                height={250}
                width={250}
                quality={100}
                style={imageStyle}
              />
            )}
          </div>
          <form className="mt-7 text-black" onSubmit={handleFormSubmit}>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-lg 
              file:bg-violet-50 file:text-[#01b7fd]
              hover:file:bg-violet-100"
              onChange={handleProfilePictureChange}
              required
            />
            <br />
            <input
              type="text"
              className="text-input"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              required
            />
            <br />
            <input
              type="email"
              name="Email"
              className="text-input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              className="text-input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
            />
            {message && <p className="text-red-500 mt-2">{message}</p>}
            <div className="mt-28 btn">
              <Button
                name="Sign Up"
                bg="white"
                color="black"
                onClick={handleFormSubmit}
              />
              <Link href="/login">
                <Button name="Login" bg="#1A1A1A" color="#898989" />
              </Link>
              <Button
                name="Terms and Conditions"
                bg="transparent"
                color="#898989"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
