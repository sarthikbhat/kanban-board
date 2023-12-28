"use client"
import Navbar from "@/components/Navbar";
import "../styles.css"
import { usePathname } from "next/navigation";
import SideMenu from "@/components/SideMenu";
import Head from "next/head";

// export const metadata: Metadata = {
//   title: "Kanban - Home",
// };

interface ILayout {
    children: React.ReactNode;
}

export default function RootLayout({ children }: ILayout) {

    return (
        <>
            <main className="flex bg-slate-100/10 h-[92vh]">
                <SideMenu />
                {children}
            </main>
        </>
    );
}
