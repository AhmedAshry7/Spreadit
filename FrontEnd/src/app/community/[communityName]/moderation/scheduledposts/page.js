"use client";
import "./Scheduled.css";
import List from "@/app/components/UI/Listbutton";
import Toogle from "@/app/components/UI/Switch";
import React, { useState, useEffect } from "react";
import OutlineButton from "@/app/components/UI/OutlineButton";
import ScheduledCard from "./ScheduledCard";
import NoScheduled from "./NoScheduled";
import handler from "@/app/utils/apiHandler.js";
import getCookies from "@/app/utils/getCookies";
import { TailSpin } from "react-loader-spinner";

/**
 * Component for rendering a list of scheduled posts for a specific community.
 * @component
 * @param   {Object} params - The parameters object containing the communityName.
 * @param   {string} params.communityName - The name of the community for which the scheduled posts are displayed.
 * @returns {JSX.Element} - The rendered ScheduledPosts component.
 *
 * @example
 * // Renders a list of scheduled posts for the "announcements" community
 * <ScheduledPosts params={{ communityName: "announcements" }} />
 */

function ScheduledPosts({ params: { communityName = "announcements" } }) {
  const [token, setToken] = useState(null);
  const [postArray, setPostArray] = useState([]);
  const [sort, setSort] = useState("Newest First");

  const sortList = ["Newest First", "Oldest First"];

  const [loading, setLoading] = useState(true); // Loading indicator

  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);

  async function getPost() {
    setLoading(true);
    try {
      
      const posts = await handler(
        `/community/moderation/${communityName}/schedule-posts`,
        "GET",
        "",
        token,
      ); //todo change api endpoint according to sortBy state
      
      setPostArray(posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      getPost();
    }, 1500);

    return () => clearTimeout(delay);
  }, [token]);

  async function DeletePost(postId) {
    try {
      
      const posts = await handler(`/posts/${postId}`, "DELETE", "", token);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      getPost();
    }
  }

  function sortPosts() {
    let posts = [...postArray];
    switch (sort) {
      case "Newest First":
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Oldest First":
        posts.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      default:
        break;
    }
    setPostArray(posts);
  }

  useEffect(() => {
    sortPosts();
  }, [sort]);

  const handleRedirect = () => {
    // Redirect to the desired URL when the div is clicked
    window.location.href = "../submit";
  };

  return (
    <div className="pageSize pagePadding">
      <div className="saveHeader pt-sm fixed" style={{ gap: "0.5em" }}>
        <List
          list={sortList}
          initialv={sort}
          choose={(item) => {
            setSort(item);
          }}
        />
        <OutlineButton
          isInverted={true}
          btnClick={() => {
            getPost();
          }}
        >
          Fetch Posts
        </OutlineButton>
        <OutlineButton
          isInverted={true}
          btnClick={() => {
            handleRedirect();
          }}
        >
          Schedule Post
        </OutlineButton>
      </div>
      <div className="pageBodyBorder">
        <div className="pageBody">
          <div className="pageBodyHeader">Scheduled Posts</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1em",
              margin: "auto auto 1em auto",
            }}
          >
            {loading && (
              <>
                Checking For Scheduled Posts...
                <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="#FF4500"
                  ariaLabel="tail-spin-loading"
                  radius="0.5"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </>
            )}
          </div>
          <div className="listArea">
            <div className="listColumn">
              {postArray.length === 0
                ? !loading && <NoScheduled communityName={communityName} />
                : postArray.map((postObject, index) => (
                    <ScheduledCard
                      key={index}
                      communityName={communityName}
                      post={postObject.title}
                      username={postObject.username}
                      date={postObject.date}
                      removeFn={DeletePost}
                      id={postObject._id}
                      content={postObject.content}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledPosts;
