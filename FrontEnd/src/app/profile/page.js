import getCookies from "../utils/getCookies";
import apiHandler from "../utils/apiHandler";
import { redirect } from "next/navigation";

async function Profile() {
  const cookies = await getCookies();

  if (cookies === null) {
    redirect("/login");
  }

  if (cookies.username) {
    redirect(`/profile/${cookies.username}`);
  } else {
    redirect("/login");
  }

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
