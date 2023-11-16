import type { Metadata } from "next";
import "./globals.css";
import Nav from "./Nav";

export const metadata: Metadata = {
  title: "Trackify",
  description: "Quick & Easy Issue Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Nav />
        <main className="main">
          <div className="grid_svg">{children}</div>
        </main>
      </body>
    </html>
  );
}
