import React from "react";
import Image from "next/image";
import GeneralSettings from "@/app/assets/GeneralSettings.svg";
import PostsandComments from "@/app/assets/PostsandComments.svg";
import CoomunityAppearance from "@/app/assets/CoomunityAppearance.svg";
import Notifications from "@/app/assets/Notifications.svg";
import ContentRating from "@/app/assets/ContentRating.svg";
import Emoji from "@/app/assets/Emoji.svg";

export const SettingsData = [
  {
    title: "General Settings",
    icon: <Image src={GeneralSettings} width={20} height={20} />,
    link: "settings",
  },
  {
    title: "Posts and Comments",
    icon: <Image src={PostsandComments} width={20} height={20} />,
    link: "postsandcomments",
  },
  {
    title: "Community Appearance",
    icon: <Image src={CoomunityAppearance} width={20} height={20} />,
    link: "communityappearance",
  },
  {
    title: "Notifications",
    icon: <Image src={Notifications} width={20} height={20} />,
    link: "notifications",
  },
  {
    title: "Content Rating",
    icon: <Image src={ContentRating} width={20} height={20} />,
    link: "contentrating",
  },
  {
    title: "Emojis",
    icon: <Image src={Emoji} width={20} height={20} />,
    link: "emojis",
  },
];
