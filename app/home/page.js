"use client";
import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Link from "next/link";
import { useUser } from "../UserContext";
import img from "../../public/pic.jpg";

const Page = () => {
  const [contacts, setContacts] = useState([]);
  const { userData } = useUser();
  const [info, setInfo] = useState([]);

  // Fetch contacts from API
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
      setContacts(uniqueContacts);
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  // Fetch contact details including profile picture
  const fetchContactInfo = async (contact) => {
    try {
      const response = await fetch(
        `https://server-hush.vercel.app/user/${contact}`
      );
      const data = await response.json();

      if (!info.some((item) => item.name === contact)) {
        if (data.profilePicture?.data) {
          const blob = new Blob(
            [new Uint8Array(data.profilePicture.data.data)],
            {
              type: data.profilePicture.contentType || "image/jpeg",
            }
          );
          data.imageURL = URL.createObjectURL(blob);
        } else {
          data.imageURL = img.src; // Fallback to default image
        }

        setInfo((prevInfo) => [...prevInfo, data]);
      }
    } catch (error) {
      console.log("Error fetching contact info:", error);
    }
  };

  // Fetch user contacts on mount
  useEffect(() => {
    fetchContacts();
  }, [userData.name]);

  // Fetch contact details whenever contacts list updates
  useEffect(() => {
    contacts.forEach((contact) => {
      fetchContactInfo(contact);
    });
  }, [contacts]);

  return (
    <>
      <Header />
      <div className="mt-1">
        {info.map(
          (contact) =>
            contact && (
              <Chat
                key={contact._id}
                userName={contact.name}
                imgSrc={contact.imageURL}
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
