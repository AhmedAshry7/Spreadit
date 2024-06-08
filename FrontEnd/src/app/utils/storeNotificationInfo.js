"use server";
import { cookies } from "next/headers";

/**
 * Function to store cookies.
 * @function
 * @async
 * @param   {Object} token   The FCM token to be stored in the cookies [Required]
 *
 * @example
 * //store FCM token
 * token = "token"
 * storeFCM(token);
 */

async function storeFCM(token) {
  cookies().set("FCM_token", "");
  cookies().set("FCM_token", token, {
    path: "/",
    maxAge: 3600 * 4, // Expires in 1 hour
    httpOnly: true,
    secure: false, // Set to true if using HTTPS only
  });
}

export default storeFCM;
