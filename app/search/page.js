"use client";
import React, { useState, useEffect } from "react";
import Button from "./../components/Button";
import Chat from "./../components/Chat";
import Header from "./../components/Header";
import img from "../../public/pic.jpg";
import { imagefrombuffer } from "imagefrombuffer";
import { Link } from "next/link";

const Page = () => {
  const [name, setName] = useState("");
  const [friends, setFriend] = useState({});
  const [found, setFound] = useState(false);
  const [foundFriend, setFoundFriend] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("https://server-hush.vercel.app/search");
      const data = await response.json();
      setFriend(data);
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
      setFoundFriend(foundFriends);
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
        foundFriend.map((friend) => (
          <div key={friend._id}>
            <Chat
              imgSrc={imagefrombuffer({
                type: friend.profilePicture?.contentType || "image/jpeg",
                data: friend.profilePicture?.data?.data || img,
              })}
              userName={friend.name}
              bg="bg-[#e11d48]"
              show={true}
            />
          </div>
        ))}

      {Object.values(friends).map((friend) => {
        return (
          <Chat
            key={friend._id}
            imgSrc={imagefrombuffer({
              type: friend.profilePicture?.contentType,
              data: friend.profilePicture?.data?.data,
            })}
            userName={friend.name}
            show={true}
          />
        );
      })}
    </>
  );
};

export default Page;
