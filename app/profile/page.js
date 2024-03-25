"use client";
import React, { useState } from "react";
import profile from "/public/profile.jpg";
import Image from "next/image";
import "../login/login.css";
import Button from "../components/Button";
import { useUser } from "../UserContext";
import { imagefrombuffer } from "imagefrombuffer";

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

const Page = () => {
  const { userData, setUserData } = useUser();

  const [user, setUser] = useState({
    name: userData.user?.name || "",
    email: userData.user?.email || "",
    password: userData.user?.password || "",
    profilePicture: userData.user?.profilePicture || null,
  });
  const [previewImage, setPreviewImage] = useState(
    imagefrombuffer({
      type: user.profilePicture?.contentType,
      data: user.profilePicture?.data?.data,
    })
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("profilePicture", e.target[0].files[0]);

      const response = await fetch(
        `https://server-hush.vercel.app/user/${userData.user._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("data", data);
      setUserData({
        user: { ...userData.user, profilePicture: previewImage, ...user },
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userData.user._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log("Account deleted:", data);
      if (data.message === "User deleted successfully") {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <div
        className=" flex flex-row items-center flex-col"
        style={{ overflowX: "hidden" }}
      >
        <h1 className="text-lg p-5" id="title">
          Profile
        </h1>
        <div>
          {user.profilePicture && (
            <div suppressHydrationWarning>
              <Image
                src={previewImage || profile}
                alt="Profile"
                height={250}
                width={250}
                style={imageStyle}
              />
            </div>
          )}
        </div>

        <div className="h-dvh w-dvw text-white-500 text-center p-10">
          <form className="mt-7 text-black" onSubmit={handleFormSubmit}>
            <input
              type="file"
              className="text-center"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.size > 15000) {
                  alert(
                    "Image size exceeds 15KB. Please choose a smaller image."
                  );
                  e.target.value = null; // Clear the file input
                  return;
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                  setUser({ ...user, profilePicture: reader.result });
                  setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
              }}
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

            <div className="mt-28 btn">
              <Button name="Save" bg="white" color="black" type="submit" />
            </div>
          </form>
          <Button
            name="Delete Account"
            onClick={handleDeleteAccount}
            bg="rgb(255, 0, 0)"
            color="white"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
