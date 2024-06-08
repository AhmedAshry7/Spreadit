import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { SidebarData } from "./SidebarData";
import { ModData } from "./ModData";
import { ResourcesData } from "./ResourcesData";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CreateCommunityModal from "./CreateCommunityModal";
import CommunitySidebarItem from "./CommunitySidebarItem";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import handler from "@/app/utils/apiHandler";
import ProfileIcon from "./ProfileIcon.jsx";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";

/**
 * A versatile sidebar component that includes multiple sections such as
 * links to different pages and dropdown menus for categories like moderation,
 * recent activities, communities, and resources. It also supports the creation
 * of a new community through a modal dialog.
 *
 * @component
 * @returns {JSX.Element} The sidebar component with navigational links and dropdowns.
 *
 * @example
 *
 * <Sidebar/>
 */

function Sidebar() {
  const router = useRouter();
  const [showModDropdown, setShowModDropdown] = useState(false);
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const [showCommunitiesDropdown, setShowCommunitiesDropdown] = useState(false);
  const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  function toggleDropdown(dropdown) {
    switch (dropdown) {
      case "mod":
        setShowModDropdown((prevShowModDropdown) => !prevShowModDropdown);
        break;
      case "recent":
        setShowRecentDropdown(
          (prevShowRecentDropdown) => !prevShowRecentDropdown,
        );
        break;
      case "communities":
        setShowCommunitiesDropdown(
          (prevShowCommunitiesDropdown) => !prevShowCommunitiesDropdown,
        );
        break;
      case "resources":
        setShowResourcesDropdown(
          (prevShowResourcesDropdown) => !prevShowResourcesDropdown,
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const cookies = await getCookies();
      // if(cookies === null || !cookies.access_token){router.push("/login")}

      // Fetch user subscribed communities
      const userData = await handler(
        `/user/profile-info/${cookies.username}`,
        "GET",
        "",
        cookies.access_token,
      );
      

      const promises = userData.subscribedCommunities.map(async (community) => {
        const isFavoriteData = await handler(
          `/community/is-favourite?communityName=${community.name}`,
          "GET",
          "",
          cookies.access_token,
        );
        return { ...community, isFavourite: isFavoriteData.isFavourite };
      });
      const arr = await Promise.all(promises);
      setCommunities(arr);
      setLoading(false);
    };
    fetchData();
  }, []);

  function CreateCommunity() {
    setShowCreateCommunityModal(true);
  }

  const CloseCreateCommunity = () => {
    setShowCreateCommunityModal(false);
  };

  return (
    <div className={styles.sidebar}>
      {showCreateCommunityModal && (
        <CreateCommunityModal close={() => CloseCreateCommunity()} />
      )}
      <ul className={styles.sidebarlist}>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className={styles.row}
              onClick={() => {
                router.push(`/${val.link}`);
              }}
            >
              <div id={styles.icon}>{val.icon}</div>{" "}
              <div id={styles.title}>{val.title}</div>
            </li>
          );
        })}
      </ul>

      <hr></hr>
      <div className={styles.dropdown} onClick={() => toggleDropdown("mod")}>
        {" "}
        <p className={styles.dropdowntitle}>MODERATION</p>
        {showModDropdown ? (
          <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrowbutton} />
        )}
      </div>

      <div
        className={`${styles.dropdownmenu} ${showModDropdown ? styles.active : styles.inactive}`}
      >
        <ul className={styles.sidebarlist}>
          {ModData.map((val, key) => {
            return (
              <li
                key={key}
                className={styles.row}
                onClick={() => {
                  router.push(`/${val.link}`);
                }}
              >
                <div id={styles.icon}>{val.icon}</div>{" "}
                <div id={styles.title}>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <hr />

      <div
        className={styles.dropdown}
        onClick={() => toggleDropdown("communities")}
      >
        {" "}
        <p className={styles.dropdowntitle}>COMMUNITIES</p>
        {showCommunitiesDropdown ? (
          <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrowbutton} />
        )}{" "}
      </div>

      <div
        className={`${styles.dropdownmenu} ${showCommunitiesDropdown ? styles.active : styles.inactive}`}
      >
        <ul className={styles.sidebarlist}>
          <CommunitySidebarItem
            title="Create a Community"
            icon={<AddIcon />}
            onCreate={CreateCommunity}
          />
          {!loading
            ? communities
                .filter((communityObj) => communityObj.isFavourite)
                .map((communityObj, key) => {
                  
                  return (
                    <CommunitySidebarItem
                      title={communityObj.name}
                      icon={<ProfileIcon url={communityObj.image} />}
                      onCreate={CreateCommunity}
                      key={key}
                      isFavoriteprop={communityObj.isFavourite}
                    />
                  );
                })
            : null}
          {!loading
            ? communities
                .filter((communityObj) => !communityObj.isFavourite)
                .map((communityObj, key) => {
                  return (
                    <CommunitySidebarItem
                      title={communityObj.name}
                      icon={<ProfileIcon url={communityObj.image} />}
                      onCreate={CreateCommunity}
                      key={key}
                      isFavoriteprop={communityObj.isFavourite}
                    />
                  );
                })
            : null}
        </ul>
      </div>

      <hr />
      <div
        className={styles.dropdown}
        onClick={() => toggleDropdown("resources")}
      >
        {" "}
        <p className={styles.dropdowntitle}>RESOURCES</p>
        {showResourcesDropdown ? (
          <KeyboardArrowUpOutlinedIcon className={styles.arrowbutton} />
        ) : (
          <KeyboardArrowDownIcon className={styles.arrowbutton} />
        )}{" "}
      </div>

      <div
        className={`${styles.dropdownmenu} ${showResourcesDropdown ? styles.active : styles.inactive}`}
      >
        <ul className={styles.sidebarlist}>
          {ResourcesData.map((val, key) => {
            return (
              <li
                key={key}
                className={styles.row}
                onClick={() => {
                  if (val.link === "Communities") {
                    router.push(`/${val.link}`);
                  } else {
                    window.location.href = val.link;
                  }
                }}
              >
                <div id={styles.icon}>{val.icon}</div>{" "}
                <div id={styles.title}>{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;
