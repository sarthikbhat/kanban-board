import AuthSide from "@/components/AuthSide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanban - Auth",
};

interface ILayout {
  path: string;
  children: React.ReactNode;
}

export default function RootLayout({ children }: ILayout) {
  return (
    <section className="flex">
      <section className="flex-1 bg-[#395886]" style={{flex:'1.5'}}><AuthSide/></section>
      <section
        className="flex flex-1 authBg"
        style={{ height: "100vh" }}
      >
        {children}
      </section>
    </section>
  );
}
