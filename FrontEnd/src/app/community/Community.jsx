import React, { useEffect, useState } from "react";
import Sidebar from "../components/UI/Sidebar";
import CommunityRightSidebar from "../components/UI/CommunityRightSidebar";
import ModCommunityRightSidebar from "../components/UI/ModCommunityRightSidebar";
import ToolBar from "../components/UI/Toolbar";
import Post from "../components/post/Post";
import "./Community.css";
import awwpfp from "@/app/assets/blueProfile.jpeg";
import awwbanner from "@/app/assets/background.jpeg";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PopupMessage from "./PopupMessage";
import DropDownItem from "../components/UI/DropdownItem";
import PostDropDownItem from "../components/post/PostDropDownItem";
import PostDropDownMenu from "../components/post/PostDropDownMenu";
import up from "@/app/assets/up-arrow.svg";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";
import { useRouter } from "next/navigation";
import { Category } from "@mui/icons-material";
import parseTime from "../utils/timeDifference";
import { set } from "date-fns";

/**
 * Component for displaying a community page with various interactive elements
 * This component includes a toolbar, sidebar, community profile, mod tools, and post-related actions
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.communityName - The name of the community
 * @returns {JSX.Element} - The rendered component of the community page
 *
 * @example
 * <Community communityName="aww" />
 */

function Community({ communityName }) {
  //const [communityName, setCommunityName] = useState("aww");
  const router = useRouter();
  const [isMod, setIsMod] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpennotification, setIsOpennotification] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [moderators, setModerators] = useState([]);

  const [communityinfo, setCommunityInfo] = useState({
    id: "",
    name: "",
    category: "",
    rules: [],
    description: "",
    communityType: "",
    membersCount: 0,
    dateCreated: "",
    communityBanner: awwbanner,
    image: awwpfp,
  });

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        try {
          const moderator = await handler(
            `/community/moderation/${communityName}/${cookies.username}/is-moderator`,
            "GET",
            "",
            cookies.access_token,
          );
          setIsMod(moderator.isModerator);

          const response = await handler(
            `/community/${communityName}/get-info`,
            "GET",
            "",
            cookies.access_token,
          );
          setCommunityInfo({
            id: response._id,
            name: response.name,
            category: response.category,
            rules: response.rules,
            description: response.description,
            communityType: response.communityType,
            membersCount: response.membersCount,
            dateCreated: response.dateCreated,
            communityBanner: response.communityBanner,
            image: response.image,
          });

          const isJoinedData = await handler(
            `/community/is-subscribed?communityName=${communityName}`,
            "GET",
            "",
            cookies.access_token,
          );
          setIsJoined(isJoinedData.isSubscribed);

          const isFavoriteData = await handler(
            `/community/is-favourite?communityName=${communityName}`,
            "GET",
            "",
            cookies.access_token,
          );
          setIsFavorite(isFavoriteData.isFavourite);

          const listOfMods = await handler(
            `/community/moderation/${communityName}/moderators`,
            "GET",
            "",
            cookies.access_token,
          );
          setModerators(listOfMods);
        } catch (err) {
          
        }
      }
    }
    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownnotiification = () => {
    setIsOpennotification(!isOpennotification);
  };

  const AddToFavorite = async () => {
    try {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        return;
      }

      if (!isFavorite) {
        setPopupMessage(`Added r/${communityName} to favorites`);
        const response = await handler(
          `/community/add-to-favourites`,
          "POST",
          { communityName: communityName },
          cookies.access_token,
        );
        setIsFavorite(!isFavorite);
      } else {
        setPopupMessage(`Removed r/${communityName} from favorites`);
        const response = await handler(
          `/community/remove-favourite`,
          "POST",
          { communityName: communityName },
          cookies.access_token,
        );
        setIsFavorite(!isFavorite);
      }
      setShowPopup(true);
      setIsOpen(false);
    } catch (err) {
      
    }
  };

  const Muted = async () => {
    try {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        return;
      }

      if (!isMuted) {
        setPopupMessage(`Muted r/${communityName}`);
        const response = await handler(
          `/community/mute`,
          "POST",
          { communityName: communityName },
          cookies.access_token,
        );
        setIsMuted(!isMuted);
      } else {
        setPopupMessage(`UnMuted r/${communityName}`);
        const response = await handler(
          `/community/unmute`,
          "POST",
          { communityName: communityName },
          cookies.access_token,
        );
        setIsMuted(!isMuted);
      }
      setShowPopup(true);
      setIsOpen(false);
    } catch (err) {
      
    }
  };

  const Joined = async () => {
    try {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        return;
      }
      const response = isJoined
        ? await handler(
            `/community/unsubscribe`,
            "POST",
            { communityName: communityName },
            cookies.access_token,
          )
        : await handler(
            `/community/subscribe`,
            "POST",
            { communityName: communityName },
            cookies.access_token,
          );
      
      setIsJoined(!isJoined);
    } catch (err) {
      
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Cleanup function to clear the timer
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  /////////////////////////// Basma Stuff ///////////////////////////

  const [showSort, setShowSort] = useState(false);
  const [showTimeSort, setShowTimeSort] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [postArray, setPostArray] = useState([]);
  const [sortBy, setSortBy] = useState("hot");
  const [timeSort, setTimeSort] = useState("today");

  const sortTimes = {
    now: "Now",
    today: "Today",
    week: "This Week",
    month: "This Month",
    year: "This Year",
    alltime: "All Time",
  };

  function changeSort(newSort) {
    setSortBy(newSort);
    setPostArray([]);
  }

  function changeTimeSort(newSort) {
    setTimeSort(newSort);
    setPostArray([]);
  }

  function toggleSortDropDown() {
    setShowSort((prevShowSort) => !prevShowSort);
  }

  function toggleTimeSortDropDown() {
    setShowTimeSort((prevShowTimeSort) => !prevShowTimeSort);
  }

  useEffect(() => {
    async function getPosts() {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        router.push("/login");
        return;
      }
      const token = cookies.access_token;
      setLoading(true);
      try {
        if (reachedEnd || postArray.length === 0) {
          const posts = await handler(
            `/subspreadit/${communityName}/${sortBy}${sortBy === "top" ? `/${timeSort}` : ""}`,
            "GET",
            "",
            token,
          ); //todo change api endpoint according to sortBy state
          
          if (sortBy === "new") setPostArray([...postArray, ...posts.posts]);
          else setPostArray([...postArray, ...posts.posts]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, [reachedEnd, sortBy, timeSort]);

  

  return (
    <div className="community">
      <ToolBar
        route={"/community"}
        page={`r/${communityName}`}
        loggedin={true}
      />

      <div className="main-container">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="community-container">
          <div className="community-profile">
            <Image
              className="banner"
              src={communityinfo.communityBanner}
              width={1800}
              height={250}
              alt="Community Banner"
            />

            <Image
              className="profile-picture"
              src={communityinfo.image}
              alt="Community Profile"
              width={55}
              height={55}
            />

            <div className="profile-box">
              <p className="community-name">r/{communityName}</p>
              <button
                className="create-post-button"
                onClick={() => {
                  router.push("/submit");
                }}
              >
                {<AddIcon />}Create a Post{" "}
              </button>
              {!isMod ? (
                isJoined ? (
                  <div className="dropdown">
                    <button
                      className="bell-button"
                      onClick={toggleDropdownnotiification}
                    >
                      {<NotificationsIcon />}
                    </button>
                    {isOpennotification && (
                      <div className="dropdown-content">
                        <button className="inline-button">Frequent</button>
                        <button>Low</button>
                        <button>Off</button>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                )
              ) : (
                <button className="bell-button">{<NotificationsIcon />}</button>
              )}
              {!isMod ? (
                !isJoined ? (
                  <button
                    className="joined-button"
                    onClick={Joined}
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Join
                  </button>
                ) : (
                  <button className="joined-button" onClick={Joined}>
                    Joined
                  </button>
                )
              ) : (
                <button
                  className="joined-button"
                  style={{
                    backgroundColor: "rgb(48, 52, 206)",
                    color: "white",
                  }}
                  onClick={() =>
                    router.push(
                      `/community/${communityName}/moderation/rulesandremoval`,
                    )
                  }
                >
                  Mod Tools
                </button>
              )}
              <div className="dropdown">
                <button onClick={toggleDropdown} className="edit-button">
                  <MoreHorizIcon />
                </button>
                {isOpen && (
                  <div className="dropdown-content">
                    <button onClick={AddToFavorite} className="inline-button">
                      {!isFavorite
                        ? "Add to favorites"
                        : "Remove from favorites"}
                    </button>
                    <button onClick={Muted}>
                      {!isMuted
                        ? `Mute r/${communityName}`
                        : `Unmute r/${communityName}`}
                    </button>
                    {isMod ? <button>Leave</button> : ""}
                  </div>
                )}
              </div>
              {showPopup && <PopupMessage message={popupMessage} />}
            </div>
          </div>

          <div className="community-post-container">
            <div className="community-post">
              <div className="post">
                <div className="sort-options">
                  <button
                    type="button"
                    className={"sortButton"}
                    onClick={toggleSortDropDown}
                  >
                    <div
                      style={{ color: "rgb(87, 111, 118)" }}
                    >{`${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`}</div>
                    <Image
                      className={"sortArrow"}
                      src={up}
                      width={12}
                      height={12}
                      viewBox="0 0 20 20"
                      alt="return to top"
                    />
                    <PostDropDownMenu
                      showDropdown={showSort}
                      setShowDropDown={setShowSort}
                    >
                      <PostDropDownItem
                        description="Random"
                        onClick={() => changeSort("random")}
                      />
                      <PostDropDownItem
                        description="Hot"
                        onClick={() => changeSort("hot")}
                      />
                      <PostDropDownItem
                        description="New"
                        onClick={() => changeSort("new")}
                      />
                      <PostDropDownItem
                        description="Top"
                        onClick={() => changeSort("top")}
                      />
                    </PostDropDownMenu>
                  </button>
                  {sortBy === "top" && (
                    <button
                      type="button"
                      className={"sortButton"}
                      onClick={toggleTimeSortDropDown}
                    >
                      <div
                        style={{ color: "rgb(87, 111, 118)" }}
                      >{`${sortTimes[timeSort]}`}</div>
                      <Image
                        className={"sortArrow"}
                        src={up}
                        width={12}
                        height={12}
                        viewBox="0 0 20 20"
                        alt="return to top"
                      />
                      <PostDropDownMenu
                        showDropdown={showTimeSort}
                        setShowDropDown={setShowTimeSort}
                      >
                        <PostDropDownItem
                          description="Now"
                          onClick={() => changeTimeSort("now")}
                        />
                        <PostDropDownItem
                          description="Today"
                          onClick={() => changeTimeSort("today")}
                        />
                        <PostDropDownItem
                          description="This Week"
                          onClick={() => changeTimeSort("week")}
                        />
                        <PostDropDownItem
                          description="This Month"
                          onClick={() => changeTimeSort("month")}
                        />
                        <PostDropDownItem
                          description="This Year"
                          onClick={() => changeTimeSort("year")}
                        />
                        <PostDropDownItem
                          description="All Time"
                          onClick={() => changeTimeSort("alltime")}
                        />
                      </PostDropDownMenu>
                    </button>
                  )}
                </div>
                {postArray.map((postObject, index) => (
                  <div className={""} key={index}>
                    {/* {console.log(postArray)} */}
                    <Post
                      postId={postObject._id}
                      subRedditName={postObject.community}
                      subRedditPicture={communityinfo.image}
                      subRedditDescription={communityinfo.description}
                      banner={communityinfo.communityBanner}
                      subRedditRules={communityinfo.rules}
                      time={parseTime(postObject.date)}
                      title={postObject.title}
                      description={
                        postObject.content[postObject.content.length - 1]
                          ? postObject.content[postObject.content.length - 1]
                          : ""
                      }
                      attachments={postObject.attachments}
                      upVotes={
                        postObject.votesUpCount - postObject.votesDownCount
                      }
                      comments={postObject.commentsCount}
                      userName={postObject.username}
                      isSpoiler={postObject.isSpoiler}
                      isNSFW={postObject.isNsfw}
                      isSaved={postObject.isSaved}
                      pollOptions={postObject.pollOptions}
                      pollIsOpen={postObject.isPollEnabled}
                      pollExpiration={
                        postObject.pollExpiration
                          ? postObject.pollExpiration
                          : ""
                      }
                      sendReplyNotifications={
                        postObject.sendPostReplyNotification
                      }
                      isMember={isJoined}
                      isApproved={postObject.isApproved}
                      isRemoved={postObject.isRemoved}
                      isSpam={postObject.isSpam}
                      isCommentsLocked={postObject.isCommentsLocked}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="right-sidebar-container">
              <div className="right-sidebar">
                {" "}
                {isMod ? (
                  <div>
                    {" "}
                    <ModCommunityRightSidebar
                      communityName={communityName}
                      communityData={communityinfo}
                      moderators={moderators}
                    />{" "}
                  </div>
                ) : (
                  <div>
                    {" "}
                    <CommunityRightSidebar
                      communityData={communityinfo}
                      moderators={moderators}
                    />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
