"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import profile from "/public/profile.jpg";
import "../login/login.css";
import Button from "../components/Button";
import { useUser } from "../UserContext";
import Header from "../components/Header";

const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

const Page = () => {
  const { userData, setUserData } = useUser();

  const [user, setUser] = useState({
    name: userData.name || "",
    email: userData.email || "",
    password: userData.password || "",
    profilePicture: userData.profilePicture || null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Convert buffer to Blob URL (if applicable)
  const convertToBlobUrl = useCallback((profilePicture) => {
    if (!profilePicture?.data?.data) return profile;
    const blob = new Blob([new Uint8Array(profilePicture.data.data)], {
      type: profilePicture.contentType || "image/jpeg",
    });
    return URL.createObjectURL(blob);
  }, []);

  // Set profile picture preview on mount (if available)
  useEffect(() => {
    if (user.profilePicture && !previewImage) {
      const blobUrl = convertToBlobUrl(user.profilePicture);
      setPreviewImage(blobUrl);
    }

    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [user.profilePicture, previewImage, convertToBlobUrl]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      if (e.target.profilePicture.files[0]) {
        formData.append("profilePicture", e.target.profilePicture.files[0]);
      }

      const response = await fetch(
        `https://server-hush.vercel.app/user/${userData.user._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update profile.");

      const data = await response.json();
      console.log("Updated user:", data);

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
        `https://hush-server.onrender.com/user/${userData.user._id}`,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > 15000) {
      alert("Image size exceeds 15KB. Please choose a smaller image.");
      return;
    }

    // Read file as DataURL
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prevUser) => ({ ...prevUser, profilePicture: reader.result }));
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center" style={{ overflowX: "hidden" }}>
        <h1 className="text-lg p-5" id="title">Profile</h1>

        {/* Profile Picture */}
        <div>
          <Image
            src={previewImage || profile}
            alt="Profile"
            height={250}
            width={250}
            style={imageStyle}
          />
        </div>

        {/* Profile Form */}
        <div className="h-dvh w-dvw text-white-500 text-center p-10">
          <form className="mt-7 text-black" onSubmit={handleFormSubmit}>
            <input
              type="file"
              name="profilePicture"
              className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-lg file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              onChange={handleFileChange}
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
              className="text-input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              className="text-input"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />

            {/* Save Button */}
            <div className="mt-28 btn">
              <Button name="Save" bg="white" color="black" type="submit" />
            </div>
          </form>

          {/* Delete Account Button */}
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
