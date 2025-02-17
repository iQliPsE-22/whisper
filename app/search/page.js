"use client";
import React, { useState, useEffect } from "react";
import Button from "./../components/Button";
import Chat from "./../components/Chat";
import Header from "./../components/Header";
import { useUser } from "../UserContext";

const Page = () => {
  const [keyword, setKeyword] = useState("");
  const { userData } = useUser();
  const [filteredFriends, setFilteredFriends] = useState(userData.myfriends || []);
  useEffect(() => {
    if (keyword.trim() === "") {
      setFilteredFriends(userData.myfriends);
    } else {
      const results = userData.myfriends.filter((friend) =>
        friend.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredFriends(results);
    }
  }, [keyword, userData.myfriends]);

  return (
    <>
      <Header />
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
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-2">No friends found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
