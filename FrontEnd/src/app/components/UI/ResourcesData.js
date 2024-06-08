import React from "react";
import BreakfastDiningTwoToneIcon from "@mui/icons-material/BreakfastDiningTwoTone";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PanoramaFishEyeRoundedIcon from "@mui/icons-material/PanoramaFishEyeRounded";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BalanceIcon from "@mui/icons-material/Balance";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import communitydefault from "../../assets/communitydefault.svg";
import styles from "@/app/search/CommentsItem.module.css";
import Image from "next/image";

export const ResourcesData = [
  {
    title: "About Spreadit",
    icon: <BreakfastDiningTwoToneIcon />,
    link: "https://www.redditinc.com/",
  },
  {
    title: "Help",
    icon: <HelpOutlineOutlinedIcon />,
    link: "https://support.reddithelp.com/hc/en-us",
  },
  {
    title: "Blog",
    icon: <ImportContactsOutlinedIcon />,
    link: "https://www.redditinc.com/blog",
  },
  {
    title: "Careers",
    icon: <BuildOutlinedIcon />,
    link: "https://www.redditinc.com/careers",
  },
  {
    title: "Press",
    icon: <CreateOutlinedIcon />,
    link: "https://www.redditinc.com/press",
  },
  {
    title: "Communities",
    icon: (
      <Image
        className={`${styles.icon} $`}
        src={communitydefault}
        alt="profile icon"
        width={25}
        height={25}
        layout="fixed"
      />
    ),
    link: "topcommunities",
  },
  {
    title: "Topics",
    icon: <GridViewOutlinedIcon />,
    link: "https://www.reddit.com/topics/a-1/",
  },
  {
    title: "Content Policy",
    icon: <ContentCopyIcon />,
    link: "https://www.redditinc.com/policies/content-policy",
  },
  {
    title: "Privacy Policy",
    icon: <BalanceIcon />,
    link: "https://www.reddit.com/policies/privacy-policy",
  },
  {
    title: "User Agreement",
    icon: <ArticleOutlinedIcon />,
    link: "https://www.redditinc.com/policies/user-agreement",
  },
];
