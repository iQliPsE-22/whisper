"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import close from "../../public/close.png";
import Chat from "./Chat";

const Hamburger = ({ setCurrentChat }) => {
  const [keyword, setKeyword] = useState("");
  const { userData } = useUser();
  const [filteredFriends, setFilteredFriends] = useState(
    userData.allusers || []
  );
  useEffect(() => {
    if (keyword.trim() === "") {
      setFilteredFriends(userData.allusers);
    } else {
      const results = userData.allusers.filter((friend) =>
        friend.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredFriends(results);
    }
  }, [keyword, userData.allusers]);

  return (
    <div className="h-dvh w-full bg-black text-white pl-2 pr-2 p-4 border-r-2">
      <section className="p-2">
        <form onSubmit={(e) => e.preventDefault()} className="mt-1">
          <input
            type="text"
            className="w-full h-12 text-black text-center mb-1 outline-none rounded-lg"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
        <div className="mt-8">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <Chat
                key={friend._id}
                imgSrc={friend.profilePicture}
                userName={friend.name}
                setCurrentChat={setCurrentChat}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-2">No friends found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hamburger;
