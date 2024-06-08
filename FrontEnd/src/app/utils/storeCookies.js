"use server";
import { cookies } from "next/headers";

/**
 * Function to store cookies.
 * @function
 * @async
 * @param   {Object} cookieData   The token to be stored in the cookies [Required]
 *
 * @example
 * //store cookies
 * token = "token"
 * storeCookies(token);
 */

async function storeCookies(cookieData) {
  cookies().set("access_token", cookieData.access_token, {
    path: "/",
    maxAge: 3600 * 48, // Expires in 1 hour
    httpOnly: true,
    secure: false, // Set to true if using HTTPS only
  });
  cookies().set("username", cookieData.user.username, {
    path: "/",
    maxAge: 3600 * 48, // Expires in 1 hour
    httpOnly: true,
    secure: false, // Set to true if using HTTPS only
  });
  cookies().set("email", cookieData.user.email, {
    path: "/",
    maxAge: 3600 * 48, // Expires in 1 hour
    httpOnly: true,
    secure: false, // Set to true if using HTTPS only
  });
  cookies().set("avatar", cookieData.user.avatar_url, {
    path: "/",
    maxAge: 3600 * 48, // Expires in 1 hour
    httpOnly: true,
    secure: false, // Set to true if using HTTPS only
  });
  cookies().set("background", cookieData.user.banner, {
    path: "/",
    maxAge: 3600 * 48, // Expires in 1 hour
    httpOnly: true,
    secure: false, // Set to true if using HTTPS only
  });
  /*       cookies().set('FCM_token', "", {
                  path: '/',
                  maxAge: 3600 * 4, // Expires in 1 hour
                  httpOnly: true,
                  secure: false, // Set to true if using HTTPS only
      }) */
}

export default storeCookies;
