"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookies from "./utils/getCookies";

function Home() {
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        router.push("/login");
      } else {
        router.push("/home");
      }
    }
    fetchData();
  }, []);

  return <div></div>;
}

export default Home;
