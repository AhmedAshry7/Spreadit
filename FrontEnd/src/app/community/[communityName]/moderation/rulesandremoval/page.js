"use client";
import RulesandRemoval from "./RulesandRemoval";

function RulesandRemovalpage({ params: { communityName } }) {
  return (
    <div>
      <RulesandRemoval communityName={communityName} />
    </div>
  );
}

export default RulesandRemovalpage;
