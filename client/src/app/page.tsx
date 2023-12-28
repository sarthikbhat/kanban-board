"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import AUTH_INTERCEPTOR from "@/services/ApiUtil";

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
    // AUTH_INTERCEPTOR.get("../../config.json").then(res=>{
    //   console.log(res);
      
    // })
  }),[]

  return (
    <>
    </>
  );
}
