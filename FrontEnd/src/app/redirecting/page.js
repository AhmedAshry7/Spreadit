"use client";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import storeCookies from "../utils/storeCookies";
import apiHandler from "../utils/apiHandler";
import getCookies from "../utils/getCookies";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

function RedirectFromGoogle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  async function getMySession(isConnected, cookies) {
    const session = await getSession();
    if (session) {
      const url = isConnected ? "/google/connected-accounts" : "/google/oauth";
      const response = await apiHandler(
        url,
        "POST",
        isConnected
          ? { googleToken: session.data }
          : { googleToken: session.data, remember_me: true },
        isConnected ? cookies.access_token : "",
      );
      
      return response;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const isConnected = searchParams.get("isConnecting");
      const cookies = await getCookies();
      getMySession(isConnected === "yes", cookies)
        .then((data) => {
          if (data && !isConnected) {
            storeCookies(data);
          }
          
        })
        .then(() => {
          router.push("/");
        });
    }
    fetchData();
  }, []);
  return (
    <div>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#FF4500"
        ariaLabel="tail-spin-loading"
        radius="0.5"
        wrapperStyle={{
          display: "flex",
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
        }}
        wrapperClass=""
      />
    </div>
  );
}

export default RedirectFromGoogle;
