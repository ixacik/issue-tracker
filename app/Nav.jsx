"use client";

import Link from "next/link";
import { set, useForm } from "react-hook-form";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { loginSchema } from "./validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginForm = z.infer<typeof loginSchema>;

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 768);
    });
  }, []);

  const currentPath = usePathname();

  const links = [
    {
      href: "/",
      text: "Dashboard",
    },
    {
      href: "/issues",
      text: "Issues",
    },
    {
      href: "/settings",
      text: "Settings",
    },
  ];

  const login = async () => {
    const token = await axios.post("/api/login", {
      email: "patriklevak@gmail.com",
      password: "houno12345",
    });

    localStorage.setItem("token", token.data.token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
  };

  return (
    <nav className="relative flex justify-center items-center">
      {!isMobile && showSidebar && (
        <div className="z-10 relative flex md:flex-col gap-10 flex-row pr-10 text-white">
          <Link href="/" className="logo">
            <FaBug />
            <p className="ml-2">Trackify</p>
          </Link>
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.text}
              className={`menu_item ${
                currentPath == link.href ? "menu_item_active" : ""
              }`}
            >
              {link.text}
            </Link>
          ))}
          {isLoggedIn ? (
            <button className="menu_item bg-red-500" onClick={logout}>
              Log out
            </button>
          ) : (
            <div className="flex justify-center mt-32 items-center flex-col space-y-6 group">
              <div className="p-5 bg-blue-500 rounded-3xl shadow-xl opacity-0 group-hover:opacity-100 ease-in-out duration-500">
                <p className="ml-3">Email:</p>
                <input
                  className="input_box shadow-xl mb-5"
                  placeholder="Enter your email"
                />
                <p className="ml-3">Password</p>
                <input
                  className="input_box shadow-xl"
                  placeholder="Enter your password"
                />
              </div>
              <div className="menu_item bg-blue-500">
                <button className="" onClick={login}>
                  Log in
                </button>
              </div>
              <button className="menu_item">Register</button>
            </div>
          )}
        </div>
      )}

      {showSidebar ? (
        <IoIosArrowBack
          className="sidebar_arrow max-md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      ) : (
        <IoIosArrowForward
          className="sidebar_arrow max-md:hidden"
          onClick={() => setShowSidebar(true)}
        />
      )}

      {/*Mobile Nav*/}
      {isMobile && (
        <div className="relative flex w-full justify-between items-center">
          <Link href="/" className="logo text-2xl">
            <FaBug />
          </Link>
          {showMenu ? (
            <HiX className="logo text-3xl" onClick={() => setShowMenu(false)} />
          ) : (
            <HiMenu
              className="logo text-3xl"
              onClick={() => setShowMenu(true)}
            />
          )}

          {showMenu && (
            <div className="flex flex-col absolute z-20 space-y-6 top-10 p-10 right-2 rounded-3xl shadow-xl bg-gray-900 ease-in-out text-white">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.text}
                  className={`menu_item ${
                    currentPath == link.href ? "menu_item_active" : ""
                  }`}
                  onClick={() => setShowMenu(false)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
