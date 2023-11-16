import Link from "next/link";
import { FaBug } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="z-10 flex flex-col space-y-6 pt-48 pr-10 text-white">
      <Link
        href="/"
        className="flex justify-center items-center text-2xl font-medium mb-10"
      >
        <FaBug />
        <p className="ml-2">Trackify</p>
      </Link>
      <Link href="/" className="menu_item">
        Dashboard
      </Link>
      <Link href="/" className="menu_item">
        Issues
      </Link>
      <Link href="/" className="menu_item">
        Settings
      </Link>
      <Link href="/" className="menu_item">
        Log Out
      </Link>
    </nav>
  );
};

export default Nav;
