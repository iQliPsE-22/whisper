import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { UserProvider } from "./UserContext";
import Hamburger from "./components/Hamburger";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hush",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header /> */}
        {/* <Hamburger /> */}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
