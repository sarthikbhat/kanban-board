"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [auth, setAuth] = useState(
    (typeof window !== "undefined") ? !!window.localStorage.getItem("token")?.length : false
  );
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/login")
    }
    else {
      router.push("/home")

    }
  }, [auth, router]);

  useEffect(()=>{
    // API_UTIL.get("../../config.json").then(res=>{
    //   console.log(res);
      
    // })
  }),[]

  return (
    <>
    </>
  );
}
