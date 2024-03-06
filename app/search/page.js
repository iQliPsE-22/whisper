"use client";
import React, { useState, useEffect } from "react";
import Button from "./../components/Button";
import Chat from "./../components/Chat";

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
      const response = await fetch("http://localhost:3000/search");
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
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="w-dvw h-12 text-black text-center mb-1"
          onChange={(e) => setName(e.target.value)}
        />
        <Button name="Search" bg="grey" color="black" type="submit" />
      </form>
      {found &&
        foundFriend.map((friend) => (
          <Chat
            key={friend._id}
            imgSrc={friend.imgSrc}
            userName={friend.name}
            bg="rose-600"
          />
        ))}

      {Object.values(friends).map((friend) => {
        return (
          <Chat
            key={friend._id}
            imgSrc={friend.imgSrc}
            userName={friend.name}
          />
        );
      })}
    </div>
  );
};

export default Page;
