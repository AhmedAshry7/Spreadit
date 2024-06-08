import React from "react";
import Image from "next/image";
import RulesAndRemovalReasons from "@/app/assets/RulesAndRemovalReasons.svg";
import ContentControl from "@/app/assets/ContentControl.svg";
import ModLog from "@/app/assets/ModLog.svg";

export const ModerationData = [
  {
    title: "Rules and Removal Reasons",
    icon: <Image src={RulesAndRemovalReasons} width={20} height={20} />,
    link: "rulesandremoval",
  },
  {
    title: "Content Controls",
    icon: <Image src={ContentControl} width={20} height={20} />,
    link: "contentcontrols",
  },
];
