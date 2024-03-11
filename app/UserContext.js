"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      return storedUserData
        ? JSON.parse(storedUserData)
        : { name: "", email: "", password: "" };
    } else {
      return { name: "", email: "", password: "" };
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
