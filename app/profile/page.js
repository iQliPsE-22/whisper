"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "../UserContext";
import Header from './../components/Header';

const ProfilePage = () => {
  const { userData } = useUser();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (userData?.profilePicture?.data) {
      const uint8Array = new Uint8Array(userData.profilePicture.data.data);
      const base64String = btoa(String.fromCharCode(...uint8Array));
      const imageSrc = `data:${userData.profilePicture.contentType};base64,${base64String}`;
      setProfilePicture(imageSrc);
    }
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header/>
    <div className="flex flex-col items-center p-5">
      {profilePicture ? (
        <Image
          src={profilePicture}
          alt="User Profile"
          width={150} 
          height={150} 
          className="rounded-full border border-gray-300 object-cover"
          priority 
          quality={75}
        />
      ) : (
        <p>No Profile Picture</p>
      )}
      <h1 className="text-lg font-semibold mt-3">{userData.name}</h1>
      <h2 className="text-sm text-gray-500">{userData.email}</h2>
    </div>
    </>
  );
};

export default ProfilePage;
