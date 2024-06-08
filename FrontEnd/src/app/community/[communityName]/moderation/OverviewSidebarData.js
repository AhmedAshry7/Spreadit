import React from "react";
import Image from "next/image";
import queues from "@/app/assets/queues.svg";
import scheduledposts from "@/app/assets/scheduledposts.svg";
import usermanagement from "@/app/assets/usermanagement.svg";
import insights from "@/app/assets/insights.svg";

export const OverviewSidebarData = [
  {
    title: "Queues",
    icon: <Image src={queues} width={20} height={20} />,
    link: "queue",
  },
  {
    title: "Scheduled Posts",
    icon: <Image src={scheduledposts} width={20} height={20} />,
    link: "scheduledposts",
  },
  {
    title: "User Management",
    icon: <Image src={usermanagement} width={20} height={20} />,
    link: "banned",
  },
  {
    title: "Insights",
    icon: <Image src={insights} width={20} height={20} />,
    link: "insights",
  },
];
