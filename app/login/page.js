"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";
import Loading from "../components/Loading";
import { jwtDecode } from "jwt-decode";
import "./login.css";

const Button = dynamic(() => import("../components/Button"), { ssr: false });

const Page = () => {
  const router = useRouter();
  const { userData, setUserData } = useUser();
  const [showLoading, setShowLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    setError("");

    try {
      const response = await fetch("https://server-hush.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const decodedToken = jwtDecode(data.token);
      setUserData(decodedToken);

      await fetchAllContacts();
      router.push("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    } finally {
      setShowLoading(false);
    }
  };

  const fetchAllContacts = useCallback(async () => {
    try {
      const response = await fetch("https://server-hush.vercel.app/search");
      if (!response.ok) throw new Error("Failed to fetch contacts");

      const data = await response.json();
      const updatedFriends = data.map((friend) => {
        if (friend.profilePicture) {
          const cachedImage = localStorage.getItem(`profile-${friend._id}`);
          if (cachedImage) {
            // Use cached image
            friend.profilePicture = cachedImage;
          } else {
            // Convert binary data to base64 and store in localStorage
            const base64Image = `data:${
              friend.profilePicture.contentType
            };base64,${Buffer.from(friend.profilePicture.data.data).toString(
              "base64"
            )}`;

            localStorage.setItem(`profile-${friend._id}`, base64Image);
            friend.profilePicture = base64Image;
          }
        }
        return friend;
      });

      setUserData((prev) => ({ ...prev, allusers: updatedFriends }));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, [setUserData]);

  return (
    <>
      {showLoading && <Loading />}
      {!showLoading && (
        <div className="h-screen flex flex-row items-center">
          <div className="h-screen w-screen text-white text-center p-10">
            <h1 className="text-lg p-5" id="title">
              Login
            </h1>
            <form className="mt-8" onSubmit={handleFormSubmit}>
              <input
                type="email"
                name="email"
                className="text-input"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
              <br />
              <input
                type="password"
                name="password"
                className="text-input"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
              <div className="mt-44">
                <Button name="Login" bg="white" color="black" type="submit" />
                <Link href="/signup">
                  <Button name="Sign Up" bg="#1A1A1A" color="#898989" />
                </Link>
                <Button
                  name="Forgot Password ?"
                  bg="transparent"
                  color="#898989"
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
