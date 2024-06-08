"use client";
import Community from "./Community";
import { redirect } from "next/navigation";

function Communitypage() {
  redirect("/home");
  return (
    <div>
      <Community />
    </div>
  );
}

export default Communitypage;
