"use server";
import { cookies } from "next/headers";

/**
 * Fuction to get stored Cookies.
 * @function
 * @async
 * @returns {Object} The stored Cookies.
 *
 * @example
 * //get stored cookies
 * const cookies = getCookies();
 *
 */

async function getCookies() {
  const cookieStore = cookies();
  if (cookieStore.has("access_token") && cookieStore.has("username")) {
    return {
      access_token: cookieStore.get("access_token").value,
      username: cookieStore.get("username").value,
      email: cookieStore.has("email") && cookieStore.get("email").value,
      avatar: cookieStore.get("avatar").value,
      FCM_token: cookieStore.has() ? cookieStore.get("FCM_token").value : "",
      background: cookieStore.get("background").value,
    };
  }
  return null;
}

export default getCookies;
