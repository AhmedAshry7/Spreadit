"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Sidebar from "../components/UI/Sidebar";
import ToolBar from "../components/UI/Toolbar";
import RecentPosts from "./RecentPosts";
import Post from "../components/post/Post";
import PostDropDownMenu from "../components/post/PostDropDownMenu";
import PostDropDownItem from "../components/post/PostDropDownItem";
import handler from "../utils/apiHandler";
import up from "../assets/up-arrow.svg";
import parseTime from "../utils/timeDifference";
import getCookies from "../utils/getCookies";
import { TailSpin } from "react-loader-spinner";

function homepage() {
  const [token, setToken] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [showSort, setShowSort] = useState(false);
  const [showTimeSort, setShowTimeSort] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [postArray, setPostArray] = useState([]);
  const [sortBy, setSortBy] = useState("best");
  const [timeSort, setTimeSort] = useState("today");
  const [totalPages, setTotalPages] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    fetchData();
  }, []);

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
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollY = typeof window !== "undefined" ? window.scrollY : 0; // Get scroll position
    setShowButton(scrollY > 200);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomOfPage = scrollTop + clientHeight + 200 >= scrollHeight;

    setReachedEnd(bottomOfPage);
  };

  const pollOptions = [
    { votes: 5, option: "Option A" },
    { votes: 5, option: "Option B" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 0);
    };

    // Subscribe to window resize event
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (token === null || currentPage > totalPages) return;
    let timer; // Declare a variable to hold the timer
    async function getPosts() {
      setLoading(true);
      try {
        if (reachedEnd || postArray.length === 0) {
          
          const posts = await handler(
            `/home/${sortBy}${sortBy === "top" ? `/${timeSort}` : ""}?page=${currentPage}`,
            "GET",
            "",
            token,
          );
          setCurrentPage(Number(posts.currentPage) + 1);
          setTotalPages(Number(posts.totalPages));
          
          const updatedPosts = posts.posts.map(async (postObj) => {
            const subscribed = await handler(
              `/community/is-subscribed?communityName=${postObj.community}`,
              "GET",
              "",
              token,
            );
            return { ...postObj, ...subscribed };
          });
          const newPosts = await Promise.all(updatedPosts);
          setPostArray([...postArray, ...newPosts]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    timer = setTimeout(getPosts, 500); // Adjust the delay as needed
    // Clear the timer on component unmount or when dependencies change
    return () => clearTimeout(timer);
  }, [reachedEnd, sortBy, timeSort, token]);

  return (
    <div className={styles.page}>
      <ToolBar loggedin={true} page={"Spreadit"} />
      {showButton === true && (
        <button
          type="button"
          className={styles.backToTop}
          onClick={() =>
            typeof window !== "undefined"
              ? window.scrollTo({ top: 0, behavior: "smooth" })
              : null
          }
        >
          <Image
            src={up}
            width={24}
            height={24}
            viewBox="0 0 20 20"
            alt="return to top"
          />
        </button>
      )}
      {windowWidth > 1400 && (
        <div className={styles.sideBar}>
          {" "}
          <Sidebar />
        </div>
      )}
      <div className={styles.feed}>
        <div className={styles.feedHeader}>
          <button
            type="button"
            className={styles.sortButton}
            onClick={toggleSortDropDown}
          >
            <div
              style={{ color: "rgb(87, 111, 118)" }}
            >{`${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`}</div>
            <Image
              className={styles.sortArrow}
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
                description="Best"
                onClick={() => changeSort("best")}
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
              className={styles.sortButton}
              onClick={toggleTimeSortDropDown}
            >
              <div
                style={{ color: "rgb(87, 111, 118)" }}
              >{`${sortTimes[timeSort]}`}</div>
              <Image
                className={styles.sortArrow}
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
        {
          <div className={styles.feedContent}>
            {postArray.map((postObject, index) => (
              <div className={styles.post} key={index}>
                <Post
                  postId={postObject._id}
                  subRedditName={postObject.community}
                  subRedditPicture={postObject.communityIcon}
                  time={parseTime(postObject.date)}
                  title={postObject.title}
                  description={
                    postObject.content[postObject.content.length - 1]
                      ? postObject.content[postObject.content.length - 1]
                      : ""
                  }
                  attachments={postObject.attachments}
                  upVotes={postObject.votesUpCount - postObject.votesDownCount}
                  upVoteStatus={
                    postObject.hasUpvoted
                      ? "upvoted"
                      : postObject.hasDownvoted
                        ? "downvoted"
                        : "neutral"
                  }
                  comments={postObject.commentsCount}
                  userName={postObject.username}
                  isSpoiler={postObject.isSpoiler}
                  isNSFW={postObject.isNsfw}
                  isSaved={postObject.isSaved}
                  pollOptions={postObject.pollOptions}
                  pollIsOpen={postObject.isPollEnabled}
                  pollExpiration={
                    postObject.pollExpiration ? postObject.pollExpiration : ""
                  }
                  pollVote={
                    postObject.hasVotedOnPoll === true
                      ? postObject.selectedPollOption
                      : ""
                  }
                  sendReplyNotifications={postObject.sendPostReplyNotification}
                  isMember={postObject.isSubscribed}
                  isApproved={postObject.isApproved}
                  isRemoved={postObject.isRemoved}
                  isSpam={postObject.isSpam}
                  isCommentsLocked={postObject.isCommentsLocked}
                />
              </div>
            ))}
            {loading && (
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#FF4500"
                ariaLabel="tail-spin-loading"
                radius="0.5"
                wrapperStyle={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "40px",
                }}
                wrapperClass=""
              />
            )}
          </div>
        }
      </div>
      {windowWidth > 1150 && (
        <div className={styles.recentPostsGridColumn}>
          {" "}
          <div className={styles.recentPostsContainer}>
            <RecentPosts />
          </div>
        </div>
      )}
    </div>
  );
}

export default homepage;
