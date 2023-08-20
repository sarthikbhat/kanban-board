"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token")?.length);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login")
    }
    else{
      router.push("/home")

    }
  }, [auth]);

  return (
    <>
    </>
  );
}
