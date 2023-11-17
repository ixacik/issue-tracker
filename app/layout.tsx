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
      <body className="flex md:flex-row flex-col">
        <Nav />
        <main className="main">
          <div className="grid_svg">
            <div className="p-16">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
