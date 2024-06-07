"use client";
import React, { useState } from "react";
import "../login/login.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
const Button = dynamic(() => import("../components/Button"), { ssr: false });
import profile from "/public/profile.jpg";
const Page = () => {
  const [user, setUser] = useState({
    profilePicture: null,
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setUser(null);
  }, []);

  const [previewImage, setPreviewImage] = useState(null);
  const [userExists, setUserExists] = useState(false); // Add userExists state
  const [userNameExists, setUserNameExists] = useState(false); // Add userExists state

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Successful");
      const formData = new FormData();
      formData.append("profilePicture", user.profilePicture);
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      const response = await fetch("https://hush-server.onrender.com/user", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      setUser({ profilePicture: null, name: "", email: "", password: "" });
      if (data.message === "User already exists") {
        console.log("User exists");
        setUserExists(true);
      } else if (data.message === "UserName already exists") {
        console.log("UserName exists");
        setUserNameExists(true);
      } else {
        setUserExists(false);
        setUserNameExists(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const imageStyle = {
    borderRadius: "50%",
    border: "2px solid white",
  };
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setPreviewImage(file); // Set the previewImage with the object URL
    setUser((prevUser) => ({
      ...prevUser,
      profilePicture: file,
    }));
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
              className="text-center"
              onChange={handleProfilePictureChange}
            />
            <br />
            <input
              type="text"
              className="text-input"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
            />
            <br />
            <input
              type="email"
              name="Email"
              className="text-input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              className="text-input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            {userExists && <p className="text-red-500">Email already exists</p>}
            {userNameExists && (
              <p className="text-red-500">UserName already exists</p>
            )}
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
