"use client";
import SideArt from "../../components/UI/SideArt";
import ChangePassword from "../../newpassword/ChangePassword";

function NewPassword({ params: { token } }) {
  return (
    <div className="PageColumns">
      <SideArt />
      <ChangePassword token={token} />
    </div>
  );
}

export default NewPassword;
