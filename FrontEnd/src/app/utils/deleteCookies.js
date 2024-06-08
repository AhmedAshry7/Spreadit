"use server";
import { cookies } from "next/headers";

async function deleteCookies() {
  cookies().delete("access_token");
  cookies().delete("username");
  cookies().delete("email");
  cookies().delete("avatar");
  cookies().delete("background");
  cookies().delete("FCM_token");
}

export default deleteCookies;
