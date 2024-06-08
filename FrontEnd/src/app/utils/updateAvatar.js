"use server";
import { cookies } from "next/headers";

async function updateAvatar(avatar) {
  cookies().delete("avatar");
  cookies().set("avatar", avatar);
}

export default updateAvatar;
