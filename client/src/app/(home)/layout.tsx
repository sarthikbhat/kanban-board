"use client"
import Navbar from "@/components/Navbar";
import "./styles.css"
import { usePathname } from "next/navigation";
import Head from "next/head";
import { Metadata, Viewport } from "next";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Kanban - Home",
// };



interface ILayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: ILayout) {
  const pathName = usePathname()


  const setStyles = () => {
    const styles: any =
      { minHeight: '100vhvh' }
    // if (typeof window !== "undefined") {
    //   if (window.location.pathname.includes("/project")) styles.maxHeight = '100vh'
    // }
    return styles
  }

  return (
    <>
      <main className="relative flex flex-col" style={setStyles()}>
        <Navbar />
        {/* <div style={(pathName.includes("/boards") || pathName.includes("/members") || pathName.includes("/settings")) ? { display: 'none' } : {}} className="hr bg-slate-100 top-[8%] !w-[97%] " /> */}
        <section>{children}</section>
      </main>
    </>
  );
}
