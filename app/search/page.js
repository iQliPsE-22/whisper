"use client";
import React, { useState, useEffect } from "react";
import Button from "./../components/Button";
import Chat from "./../components/Chat";
import Header from "./../components/Header";
import { Link } from "next/link";

const Page = () => {
  const [name, setName] = useState("");
  const [friends, setFriends] = useState([]);
  const [found, setFound] = useState(false);
  const [foundFriends, setFoundFriends] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("https://server-hush.vercel.app/search");
      const data = await response.json();
      const updatedFriends = data.map((friend) => {
        if (friend.profilePicture) {
          const blob = new Blob(
            [new Uint8Array(friend.profilePicture.data.data)],
            { type: friend.profilePicture.contentType }
          );
          friend.profilePicture = URL.createObjectURL(blob);
        }
        return friend;
      });
      setFriends(updatedFriends);
      console.log(data);
    } catch (error) {
      console.error("Error fetching list data:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const foundFriends = friends.filter((friend) => friend.name === name);
    if (foundFriends.length > 0) {
      console.log("Friends found:", foundFriends);
      setFound(true);
      setFoundFriends(foundFriends);
    } else {
      console.log("Friends not found");
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSearch} className="mt-1">
        <input
          type="text"
          className="w-dvw h-12 text-black text-center mb-1"
          onChange={(e) => setName(e.target.value)}
        />
        <Button name="Search" bg="grey" color="white" type="submit" />
      </form>

      {found &&
        foundFriends.map((friend) => (
          <div key={friend._id}>
            <Chat
              imgSrc={friend.profilePicture}
              userName={friend.name}
              bg="bg-[#e11d48]"
              show={true}
            />
          </div>
        ))}

      {friends.map((friend) => (
        <Chat
          key={friend._id}
          imgSrc={friend.profilePicture}
          userName={friend.name}
          show={true}
        />
      ))}
    </>
  );
};

export default Page;
