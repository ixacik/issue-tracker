"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const Nav = () => {
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
    <nav className="z-10 flex flex-col space-y-6 pt-48 pr-10 text-white">
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
    </nav>
  );
};

export default Nav;
