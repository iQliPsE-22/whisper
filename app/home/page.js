"use client";
import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import Chat from "./../components/Chat";
import Image from "next/image";
import { Head } from "next/head";
import Link from "next/link";
import "./page.css";
import { useUser } from "../UserContext";
const Page = () => {
  const [contacts, setContacts] = useState([]);
  const { userData, setUserData } = useUser();
  const [info, setInfo] = useState([]);
  const [user, setUser] = useState({
    name: userData.user?.name || "",
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/chat");
      const data = await response.json();
      const filteredContacts = data.filter(
        (contact) => contact.sender === user.name
      );
      const uniqueContacts = [
        ...new Set(filteredContacts.map((contact) => contact.recipient)),
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
    } catch (error) {
      console.log("Error fetching contact info:", error);
    }
  };
  useEffect(() => {
    fetchContacts();
    contacts.forEach((contact) => {
      fetchContactInfo(contact);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="mt-1">
        {contacts.map((contact) => (
          <Link key={contact.recipient} href={`/chat/${contact}`}>
            <Chat userName={contact} />
          </Link>
        ))}
      </div>
      <div className="sticky bottom-0 bg-[#1E1E1E] w-auto h-16 flex justify-center items-center">
        <Link href="/search">
          <button id="add-btn">Start Whispering</button>
        </Link>
      </div>
    </>
  );
};

export default Page;
