"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

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
    {
      href: "/logout",
      text: "Log Out",
    },
  ];

  return (
    <nav className="relative flex justify-center items-center">
      {!isMobile && showSidebar && (
        <div className="z-10 relative flex md:flex-col flex-row space-y-6 pr-10 text-white">
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
