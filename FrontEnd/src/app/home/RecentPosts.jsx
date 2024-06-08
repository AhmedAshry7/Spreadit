import styles from "./RecentPosts.module.css";
import MiniaturePost from "./MiniaturePost";
import handler from "../utils/apiHandler";
import { useEffect, useState } from "react";
import getCookies from "../utils/getCookies";

function RecentPosts() {
  const [token, setToken] = useState(null);
  const [postArray, setPostArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subArray, setSubArray] = useState([]);

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

  async function handleClear() {
    try {
      const response = await handler(`/deleterecent/`, "DELETE", "", token);
      
      setPostArray([]);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  useEffect(() => {
    if (token === null) return;
    async function getPosts() {
      setLoading(true);
      try {
        let posts = await handler(`/home/recentposts`, "GET", "", token);
        
        setPostArray([...postArray, ...posts.posts]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, [token]);

  useEffect(() => {
    if (token === null) return;
    async function getRemainingData() {
      try {
        const subsPromises = postArray.map(async (postObj) => {
          const subData = await handler(
            `/community/${postObj.community}/get-info`,
            "GET",
            "",
            token,
          );
          const subscribed = await handler(
            `/community/is-subscribed?communityName=${postObj.community}`,
            "GET",
            "",
            token,
          );
          setSubArray((prevSubs) => [
            ...prevSubs,
            { ...subData, ...subscribed },
          ]);
          return { ...subData, ...subscribed };
        });
        const subs = await Promise.all(subsPromises);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getRemainingData();
  }, [postArray]);

  return (
    <div className={styles.recentPosts}>
      <div className={styles.header}>
        <div className={styles.title}>RECENT POSTS</div>
        <button
          type="button"
          className={styles.clear}
          onClick={() => {
            handleClear();
          }}
        >
          Clear
        </button>
      </div>
      {loading === false && (
        <div className={styles.body}>
          {postArray.map((postObject, index) => (
            <div className={styles.post} key={index}>
              <MiniaturePost
                postId={postObject._id}
                subRedditName={postObject.community}
                subRedditPicture={postObject.communityIcon}
                subRedditDescription={
                  subArray[index] ? subArray[index].description : ""
                }
                subRedditBanner={
                  subArray[index] ? subArray[index].communityBanner : ""
                }
                postTitle={postObject.title}
                attachments={postObject.attachments}
                upVotes={postObject.votesUpCount - postObject.votesDownCount}
                comments={postObject.commentsCount}
                isNSFW={postObject.isNsfw}
                isSpoiler={postObject.isSpoiler}
                isMember={subArray[index] ? subArray[index].isSubscribed : true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentPosts;
