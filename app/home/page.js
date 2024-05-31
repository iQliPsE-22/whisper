"use client";
import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Image from "next/image";
import { Head } from "next/head";
import Link from "next/link";
import "./page.css";
import { useUser } from "../UserContext";
import { imagefrombuffer } from "imagefrombuffer";
import img from "../../public/pic.jpg";

const Page = () => {
  const [contacts, setContacts] = useState([]);
  const { userData, setUserData } = useUser();
  const [user, setUser] = useState({
    name: userData.user?.name || "",
  });
  const [info, setInfo] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await fetch("https://server-hush.vercel.app/chats");
      const data = await response.json();
      const filteredContacts = data.filter(
        (contact) =>
          contact.sender === user.name || contact.recipient === user.name
      );
      const uniqueContacts = [
        ...new Set(
          filteredContacts.map((contact) =>
            contact.sender === user.name ? contact.recipient : contact.sender
          )
        ),
      ];
      console.log("uniqueContacts", uniqueContacts);
      setContacts(uniqueContacts);
    } catch (error) {
      console.log("Error fetching list data:", error);
    }
  };
  const fetchContactInfo = async (contact) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${contact}`);
      const data = await response.json();
      console.log("data", data);
      if (!info.some((item) => item.name === contact)) {
        setInfo((prevInfo) => [...prevInfo, data]);
      }
    } catch (error) {
      console.log("Error fetching list data:", error);
    }
  };

  useEffect(() => {
    contacts.forEach((contact) => {
      fetchContactInfo(contact);
    });
  }, [contacts.length]);

  useEffect(() => {
    fetchContacts();
  }, []);
  // console.log("info", info);
  return (
    <>
      <Header />
      <div className="mt-1">
        {info.map((contact) => (
          <Chat
            key={contact._id}
            userName={contact.name}
            imgSrc={imagefrombuffer({
              type: contact.profilePicture?.contentType || "image/jpeg",
              data: contact.profilePicture?.data?.data || img,
            })}
          />
        ))}
      </div>
      <div className="fixed bottom-0 bg-[#1E1E1E] w-screen h-16 flex justify-center items-center">
        <Link href="/search">
          <button id="add-btn">Start Whispering</button>
        </Link>
      </div>
    </>
  );
};
export default Page;
