"use client";
import React, { useState } from "react";
import profile from "/public/profile.jpg";
import Image from "next/image";
import "../login/login.css";
import Button from "../components/Button";
import { useUser } from "../UserContext";

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

const Page = () => {
  const { userData, setUserData } = useUser();
  // const [user, setUser] = useState(userData.user);
  console.log(userData.user.token);
  const [previewImage, setPreviewImage] = useState(null);
  const handleFormSubmit = () => {};
  return (
    <>
      <div
        className=" flex flex-row items-center flex-col"
        style={{ overflowX: "hidden" }}
      >
        <h1 className="text-lg p-5" id="title">
          Profile
        </h1>
        <div style={{ borderRadius: "50%" }}>
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
        <div className="h-dvh w-dvw text-white-500 text-center p-10">
          <form className="mt-7 text-black" onSubmit={handleFormSubmit}>
            <input
              type="file"
              className="text-center"
              onChange={(e) => setPreviewImage(e.target.files[0])}
            />
            <br />
            <input
              type="text"
              className="text-input"
              value="hello"
              // onChange={(e) => setUser({name: e.target.value })}
              placeholder="Name"
            />
            <br />
            <input
              type="email"
              name="Email"
              className="text-input"
              value="email"
              // onChange={(e) => setUser({email: e.target.value })}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              className="text-input"
              value="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />

            <div className="mt-28 btn">
              <Button name="Save" bg="white" color="black" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
