import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import NotificationsModal from "../../notifications/NotificationsModal";
import logo from "../../assets/logoSpreadIt.svg";
import searchicon from "../../assets/search.svg";
import listicon from "../../assets/list.svg";
import chaticon from "../../assets/chat-dots.svg";
import notificationicon from "../../assets/bell.svg";
import createicon from "../../assets/create.svg";
import settingsicon from "../../assets/gear.svg";
import logouticon from "../../assets/logout.svg";
import profilepicture from "../../assets/PP1.png";
import styles from "./Toolbar.module.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import deleteCookies from "@/app/utils/deleteCookies";
import RecentSearchItem from "./RecentSearchItem";
import TrendingTodayItem from "./TrendingTodayItem";
import SearchItem from "./SearchItem";
import awwpfp from "@/app/assets/awwpfp.jpg";
import trendingtoday from "../../assets/trendingtoday.svg";
import searchclose from "../../assets/searchclose.svg";
import handler from "@/app/utils/apiHandler";
import FcmTokenComp from "@/app/utils/firebaseForeground";
import ForegroundNotification from "./ForegroundNotification";

/**
 * ToolBar component for displaying navigation and user-related actions
 * @component
 * @param {string} page The current page name
 * @param {boolean} loggedin Indicates if the user is logged in or not
 * @param {string} route Indicates if the user is in a community or a profile
 * @returns {JSX.Element} The rendered ToolBar component.
 *
 * @example
 * const page = "Home"
 * const loggedin = true
 * const route= "/profile"
 * <ToolBar page={page} loggedin={loggedin} route={route}/>
 *
 * @example
 * const page = "Profile"
 * const loggedin = false
 * const route = "/profile"
 * <ToolBar page={page} loggedin={loggedin} route={route} />
 */

const ToolBar = ({ page, loggedin, route }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [showNotificationPopUp, setShowNotificationPopUp] = useState(false);
  const [avatar, setAvatar] = useState(profilepicture);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [pageIn, setPageIn] = useState(page);
  const [searchHistory, setSearchHistory] = useState([]);
  const [trendingToday, setTrendingToday] = useState({ results: [] });
  const [searchSuggestion, setSearchSuggestion] = useState({
    communities: [],
    users: [],
  });

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setShowList(false);
        setShowModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [profileRef]);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!notificationRef.current?.contains(event.target)) {
        setShowNotificationsModal(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [notificationRef]);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.avatar) {
        setAvatar(cookies.avatar);
        setToken(cookies.access_token);
      } else {
        redirect("/login");
      }
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await deleteCookies();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        // Loop through the registered service workers
        registrations.forEach(function (registration) {
          // Unregister each service worker
          registration
            .unregister()
            .then(function (success) {
              
            })
            .catch(function (error) {
              console.error("Failed to unregister service worker:", error);
            });
        });
      });
    }
    router.push("/login");
  };

  useEffect(() => {
    if (token === null) return;
    async function getNotificationsNumber() {
      try {
        const count = await handler(
          `/notifications/unread/count`,
          "GET",
          "",
          token,
        );
        
        setNotificationNumber(count.unreadCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getNotificationsNumber();
  }, [token, showNotificationPopUp]);

  useEffect(() => {
    if (showNotificationPopUp) {
      // Trigger the animation after a delay
      const showTimeout = setTimeout(
        () => setShowNotificationPopUp(true),
        1000,
      );

      // Clear timeout on component unmount
      return () => clearTimeout(showTimeout);
    }
  }, [showNotificationPopUp]);

  useEffect(() => {
    if (showNotificationPopUp) {
      // Set a timeout to hide the component after 10 seconds
      const hideTimeout = setTimeout(
        () => setShowNotificationPopUp(false),
        10000,
      );

      // Clear timeout on component unmount or when show becomes false
      return () => clearTimeout(hideTimeout);
    }
  }, [showNotificationPopUp]);

  useEffect(() => {
    async function getSearchHistory() {
      try {
        const history = await handler(`/search/history`, "GET", "", token);
        setSearchHistory(history);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getSearchHistory();
  }, [token]);

  useEffect(() => {
    async function getTrendingToday() {
      try {
        const trending = await handler(`/search/trending`, "GET", "", token);
        setTrendingToday(trending);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getTrendingToday();
  }, [token]);

  const searchinput = async (values) => {
    setSearchInput(values.query);
    try {
      await handler("/search/log", "POST", values, token);
    } catch (error) {
      
    }
    if (pageIn === "Spreadit") {
      router.push(`/search?q=${searchInput}`);
    } else {
      router.push(
        `${route}/${page.split("/")[1]}/search?q=${searchInput}&name=${page.split("/")[1]}`,
      );
    }
  };

  const searchsuggestion = async (values) => {
    setSearchInput(values);
    try {
      const queryString = `?q=${encodeURIComponent(values)}`;
      const suggestions = await handler(
        `/search/suggestions${queryString}`,
        "GET",
        null,
        token,
      );
      
      setSearchSuggestion(suggestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.barcontainer}>
      <FcmTokenComp
        onReceive={() => {
          setShowNotificationPopUp(false); // Hide the current notification
          setTimeout(() => {
            setShowNotificationPopUp(true); // Show the new notification after a delay
          }, 1000); // Adjust the delay as needed
        }}
      />
      <div
        className={`${styles.notificationPopUp} ${showNotificationPopUp ? styles.showNotificationPopUp : ""}`}
        onClick={() => {
          setShowNotificationsModal(true);
          setShowNotificationPopUp(false);
        }}
      >
        {" "}
        <ForegroundNotification message={"You have a new notification"} />{" "}
      </div>
      <div className={styles.leftbar}>
        <Image
          src={listicon}
          alt="list icon"
          className={styles.listicon}
          onClick={() => setShowModal(!showModal)}
        />
        <Link className={styles.link} href="/home">
          <div className={styles.icontitle}>
            <Image src={logo} alt="Spreadit Logo" className={styles.logo} />
            <p className={styles.maintitle}>Spreadit</p>
          </div>
        </Link>
      </div>

      <div className={styles.searchbar}>
        <Image
          src={searchicon}
          alt="search icon"
          className={styles.searchicon}
        />
        <div className={styles.searchinputholder}>
          {pageIn === "Spreadit" ? (
            ""
          ) : (
            <div className={styles.searchbarpage}>
              <p className={styles.searchbarpagetext}>{page}</p>
              <Image
                className={`${styles.close} $`}
                src={searchclose}
                alt="close icon"
                width={15}
                height={15}
                layout="fixed"
                onClick={() => setPageIn("Spreadit")}
              />
            </div>
          )}

          <input
            className={styles.searchinput}
            placeholder={`search ${pageIn}`}
            value={searchInput}
            onChange={(e) => searchsuggestion(e.target.value)}
            onClick={() => setShowDropdown(!showDropdown)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e) =>
                  searchinput({
                    query: e.target.value,
                    type: "normal",
                    communityname: "",
                    username: "",
                    isInProfile: pageIn === "Spreadit" ? false : true,
                  });
              }
            }}
          />
        </div>

        {showDropdown &&
          (!searchInput ? (
            <ul className={styles.dropdown}>
              <br></br>
              {searchHistory.map((item, index) => (
                <RecentSearchItem
                  title={
                    item.communityName
                      ? item.communityName
                      : item.query
                        ? item.query
                        : item.userName
                  }
                  url={
                    item.communityProfilePic
                      ? item.communityProfilePic
                      : item.userProfilePic
                        ? item.userProfilePic
                        : ""
                  }
                  key={index}
                  type={item.type}
                  page={page}
                  pageIn={pageIn}
                  route={route}
                />
              ))}

              <hr className={styles.spliter} />

              <div className={styles.trendingtoday}>
                <Image
                  src={trendingtoday}
                  alt="Trending Today icon"
                  width={20}
                  height={20}
                  layout="fixed"
                />{" "}
                TRENDING TODAY
              </div>
              {trendingToday.results.map((item, index) => (
                <TrendingTodayItem
                  title={item.title}
                  url={item.communityProfilePic}
                  image={item.attachments[0].link}
                  description={""}
                  community={item.communityname}
                  key={index}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.search}>
              <ul className={styles.dropdown}>
                <br></br>
                <div className={styles.searchtitle}>Community</div>
                {searchSuggestion.communities.map((item, index) => {
                  return (
                    <SearchItem
                      name={item.communityName}
                      url={item.communityProfilePic}
                      membersorkarmas={item.membersCount}
                      type={"community"}
                      key={index}
                    />
                  );
                })}
                <div className={styles.searchtitle}>People</div>
                {searchSuggestion.users.map((item, index) => {
                  return (
                    <SearchItem
                      name={item.username}
                      url={item.userProfilePic}
                      membersorkarmas={item.karmaCount}
                      type={"people"}
                      key={index}
                    />
                  );
                })}

                <hr className={styles.spliter} />
                <button
                  className={styles.searchbutton}
                  onClick={() =>
                    searchinput({
                      query: searchInput,
                      type: "normal",
                      communityname: "",
                      username: "",
                      isInProfile: pageIn === "Spreadit" ? false : true,
                    })
                  }
                >
                  <Image src={searchicon} alt="search icon" /> Search for '
                  {searchInput}'
                </button>
              </ul>
            </div>
          ))}
      </div>

      <div className={styles.rightbar}>
        {!loggedin && (
          <Link className={styles.link} href="/login">
            <button className={styles.loginbutton}>Log In</button>
          </Link>
        )}
        {loggedin && (
          <div className={styles.baricons}>
            <Link className={styles.link} href="/chats/create">
              <Image src={chaticon} alt="chat icon" className={styles.icons} />
            </Link>
            <Link className={styles.link} href="/submit">
              <div className={styles.createbutton}>
                <Image
                  src={createicon}
                  alt="create icon"
                  className={styles.icons}
                />
                <p className={styles.buttondescription}>Create</p>
              </div>
            </Link>
            <div className={styles.notifications}>
              <div
                className={styles.icons}
                onClick={() => {
                  setShowNotificationsModal(!showNotificationsModal);
                }}
              >
                <Image src={notificationicon} alt="notification icon" />
                {notificationNumber !== 0 && (
                  <div
                    style={{
                      width: `${10 + notificationNumber.toString().length * 6}px`,
                      height: `${10 + notificationNumber.toString().length * 6}px`,
                    }}
                    className={styles.notificationNumber}
                  >
                    {notificationNumber}
                  </div>
                )}
              </div>
              {showNotificationsModal && (
                <div
                  ref={notificationRef}
                  className={styles.notificationsModal}
                >
                  <NotificationsModal />
                </div>
              )}
            </div>
            <Image
              src={avatar}
              width={40}
              height={40}
              alt="profile picture"
              className={styles.profilepicture}
              onClick={() => setShowList(!showList)}
            />
          </div>
        )}
        {showList && (
          <ul className={styles.unorderedlist} ref={profileRef}>
            <Link className={styles.link} href="/profile">
              <li className={styles.listitem}>
                <Image
                  src={avatar}
                  width={40}
                  height={40}
                  alt="profile picture"
                  className={styles.icons}
                />
                <p className={styles.itemlabel}>View profile</p>
              </li>
            </Link>
            <li onClick={handleLogout} className={styles.listitem}>
              <Image
                src={logouticon}
                alt="logout icon"
                className={styles.icons}
              />
              <p className={styles.itemlabel}>Log out</p>
            </li>
            <Link className={styles.link} href="/settings/account">
              <li className={styles.listitem}>
                <Image
                  src={settingsicon}
                  alt="settings icon"
                  className={styles.icons}
                />
                <p className={styles.itemlabel}>Settings</p>
              </li>
            </Link>
          </ul>
        )}
      </div>
      {showModal && (
        <div className={styles.modaloverlay}>
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default ToolBar;
