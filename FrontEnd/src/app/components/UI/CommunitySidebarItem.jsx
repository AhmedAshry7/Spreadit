import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import handler from "@/app/utils/apiHandler";

/**
 * Component for displaying a single item in a sidebar that can represent a community link or a creation option within a platform similar to social media or content management systems.
 *
 * The component allows interaction through clickable elements that can either direct the user to a specified community or handle a creation action. It also includes a toggle for marking the item as a favorite, which visually changes the star icon next to the community name.
 *
 * @component
 * @param {Object} props  The properties passed to the component
 * @param {string} props.title  Display name of the community or action
 * @param {JSX.Element} props.icon  The icon representing the community or action
 * @param {number} props.key  Unique key for React's rendering list
 * @param {Function} props.onCreate  Function to execute when the 'create' action is triggered
 * @returns {JSX.Element}
 *
 * @example
 * // Example usage of CommunitySidebarItem for a community link
 *
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 *
 * <CommunitySidebarItem
 *   title="Example Community"
 *   icon={<img src={awwpfp} alt="Subspreaditreddit Icon" />}
 *   key={1}
 *   onCreate={() => console.log("Create new community")}
 * />
 */

function CommunitySidebarItem({ title, icon, key, onCreate, isFavoriteprop }) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteprop);
  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (title === "Create a Community") {
  //       return;
  //     }
  //     const cookies = await getCookies();
  //     if (cookies === null || !cookies.access_token) {
  //       router.push("/login");
  //     }

  //     const isFavoriteData = await handler(
  //       `/community/is-favourite?communityName=${title}`,
  //       "GET",
  //       "",
  //       cookies.access_token
  //     );
  //     
  //     setIsFavorite(isFavoriteData.isFavourite);
  //   }
  //   fetchData();
  // }, [])

  const handleStarClick = async (event) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    const cookies = await getCookies();
    if (cookies === null || !cookies.access_token) {
      router.push("/login");
    }
    const respone = isFavorite
      ? await handler(
          `/community/remove-favourite`,
          "POST",
          { communityName: title },
          cookies.access_token,
        )
      : await handler(
          `/community/add-to-favourites`,
          "POST",
          { communityName: title },
          cookies.access_token,
        );
    
  };

  const handleItemClick = () => {
    if (title === "Create a Community") {
      onCreate();
    } else {
      router.push(`/community/${title}`);
    }
  };

  return (
    <div className={styles.click} onClick={handleItemClick}>
      <li key={key} className={styles.row}>
        <div id={styles.icon}>{icon}</div> <div id={styles.title}>{title}</div>
        {title !== "Create a Community" && (
          <div onClick={handleStarClick}>
            {" "}
            {isFavorite ? <StarIcon /> : <StarOutlineOutlinedIcon />}
          </div>
        )}
      </li>
    </div>
  );
}

export default CommunitySidebarItem;
