"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [auth, setAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login")
    }
  }, [auth]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Root
    </main>
  );
}
