"use client";
import Community from "../Community";

function Communitypage({ params: { communityName } }) {
  return (
    <div>
      <Community communityName={communityName} />
    </div>
  );
}

export default Communitypage;
