"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const toastOptions = {
  error: {
    style: {
      background: "#D8000C",
      color: "white",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#D8000C",
    },
  },
  success: {
    style: {
      background: "#4F8A10",
      color: "white",
    },
    iconTheme: {
      primary: "#ffffff",
      secondary: "#4F8A10",
    },
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathName = usePathname()
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(pathName.split("/").pop() || "");
  }, [pathName])

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Kanban Board </title>
        <link rel="icon" type="img/png" href="/favicon.png" />
      </head>
      <body style={{ minHeight: "100vh" }} className={inter.className}>
        <Toaster
          position="bottom-right"
          toastOptions={toastOptions}
          reverseOrder={false}
        />
        {children}
      </body>
    </html>
  );
}
