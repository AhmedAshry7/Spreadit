"use client";
import SideArt from "../components/UI/SideArt";
import ChangePassword from "./ChangePassword";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NewPassword() {
  const searchParams = useSearchParams();

  const token = searchParams.has("token") ? searchParams.get("token") : "";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="PageColumns">
        <SideArt />
        <ChangePassword token={token} />
      </div>
    </Suspense>
  );
}

export default NewPassword;
