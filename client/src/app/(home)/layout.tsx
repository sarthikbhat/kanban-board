import AuthSide from "@/components/AuthSide";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanban - Home",
};

interface ILayout {
  path: string;
  children: React.ReactNode;
}

export default function RootLayout({ children }: ILayout) {
  return (
    <main style={{minHeight:'100vh'}}>
      <Navbar />
      <section>{children}</section>
    </main>
  );
}
