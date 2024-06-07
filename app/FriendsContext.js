"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [friend, setFriend] = useState([]);

  const fetchFriends = async () => {
    try {
      const response = await fetch("https://hush-server.onrender.com/search");
      const data = await response.json();
      setFriend(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching list data:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <FriendsContext.Provider value={{ friend }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriend = () => useContext(FriendsContext);
