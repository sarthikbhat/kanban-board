"use client"
import SideMenu from "@/components/SideMenu";
import "../styles.css";
import { AnimatePresence } from "framer-motion";

interface ILayout {
    children: React.ReactNode;
}

export default function RootLayout({ children }: ILayout) {

    return (
        <AnimatePresence mode="wait" initial={false}>

            <main className="flex bg-slate-100/10 h-[92vh]">
                <SideMenu />
                {children}
            </main>
        </AnimatePresence>
    );
}
