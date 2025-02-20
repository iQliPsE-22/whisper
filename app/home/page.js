"use client";
import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Link from "next/link";
import { useUser } from "../UserContext";
import img from "../../public/pic.jpg";

const Page = () => {
  const { userData, setUserData } = useUser();
  const [friends, setFriends] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await fetch("https://server-hush.vercel.app/chats");
      const data = await response.json();

      const filteredContacts = data.filter(
        (contact) =>
          contact.sender === userData.name ||
          contact.recipient === userData.name
      );

      const uniqueContacts = [
        ...new Set(
          filteredContacts.map((contact) =>
            contact.sender === userData.name
              ? contact.recipient
              : contact.sender
          )
        ),
      ];
      console.log("Unique Contacts:", uniqueContacts);
      const friendsList = userData.allusers.filter((friend) =>
        uniqueContacts.includes(friend.name)
      );
      setUserData({ ...userData, myfriends: [...friendsList] });
      setFriends(friendsList);
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [userData.name]);

  return (
    <>
      <Header />
      <div className="mt-1">
        {friends.map(
          (contact) =>
            contact && (
              <Chat
                key={contact._id}
                userName={contact.name}
                imgSrc={contact.profilePicture}
              />
            )
        )}
      </div>

      <div className="fixed bottom-0 bg-[#1E1E1E] w-screen h-16 flex justify-center items-center">
        <Link href="/search">
          <button id="add-btn" className="julius">
            Start Whispering
          </button>
        </Link>
      </div>
    </>
  );
};

export default Page;
