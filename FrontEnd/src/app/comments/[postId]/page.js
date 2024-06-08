"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import ToolBar from "../../components/UI/Toolbar";
import Sidebar from "../../components/UI/Sidebar";
import Comment from "../../components/UI/Comment";
import apiHandler from "../../utils/apiHandler";
import Post from "../../components/post/Post";
import CommentPost from "../../components/UI/CommentPost";
import CommentInput from "../../components/UI/CommentInput";
import RightCommentsSidebar from "../../components/UI/RightCommentsSidebar";
import { useSearchParams } from "next/navigation";
import parseTime from "@/app/utils/timeDifference";
import getCookies from "@/app/utils/getCookies";
import { useRouter } from "next/navigation";

const Home = ({ params: { postId } }) => {
  const router = useRouter();
  const [temporaryToken, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
        setUserName(cookies.username);
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);

  const searchParams = useSearchParams();
  const isedit = searchParams.has("isEditing");
  const [addingComment, setAddingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [thePost, setThePost] = useState(null);
  const [theSub, setTheSub] = useState(null);
  const [joined, setJoined] = useState(false);
  const [subscribe, setSubscribe] = useState(null);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    setIsEditing(isedit);
  });

  useEffect(() => {
    async function getPost() {
      if (temporaryToken === null) {
        return;
      }
      setLoading(true);
      try {
        const post = await apiHandler(
          `/posts/${postId}`,
          "GET",
          "",
          temporaryToken,
        );
        
        setThePost(post);
        const subData = await apiHandler(
          `/community/${post.community}/get-info`,
          "GET",
          "",
          temporaryToken,
        );
        const subscribed = await apiHandler(
          `/community/is-subscribed?communityName=${post.community}`,
          "GET",
          "",
          temporaryToken,
        );
        const moderator = await apiHandler(
          `/community/moderation/${post.community}/${userName}/is-moderator`,
          "GET",
          "",
          temporaryToken,
        );
        setTheSub(subData);
        
        
        setIsModerator(moderator.isModerator);
        setSubscribe(subscribed);
        setJoined(subscribed.isSubscribed);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, [temporaryToken]);

  useEffect(() => {
    async function getComments() {
      if (temporaryToken === null) {
        return;
      }
      try {
        setLoadingComments(true);
        const commentsData = await apiHandler(
          `/posts/comment/${postId}?include_replies=true`,
          "GET",
          "",
          temporaryToken,
        );
        
        setComments(commentsData.comments);
        setLoadingComments(false);
      } catch (error) {
        setLoadingComments(false);
        console.error("Error fetching data:", error);
      }
    }
    getComments();
  }, [temporaryToken]);

  const onComment = async (newComment) => {
    try {
      const formData = new FormData();

      formData.append("content", newComment.content);

      if (newComment.attachments) {
        formData.append("attachments", newComment.attachments);
      }
      formData.append("fileType", "image");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/comment/${thePost._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${temporaryToken}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      
      setAddingComment(false);
      setComments((prev) => [...prev, responseData.comment]);
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  async function handleJoin() {
    let response;
    try {
      if (joined) {
        response = await apiHandler(
          "/community/unsubscribe",
          "POST",
          { communityName: thePost.community },
          temporaryToken,
        );
        setJoined(false);
      } else {
        response = await apiHandler(
          "/community/subscribe",
          "POST",
          { communityName: thePost.community },
          temporaryToken,
        );
        setJoined(true);
      }
      
    } catch (e) {
      console.error("Error fetching Data: ", e);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    !loading && (
      <div>
        <ToolBar page="spreadit" loggedin={true} />
        <div className={styles.page}>
          <div className={styles.leftbar}>
            <Sidebar />
          </div>
          <div className={styles.mainbar}>
            <div className={styles.postarea}>
              <CommentPost
                postId={thePost._id}
                profilePicture={thePost.userProfilePic}
                cakeDate={"1/1/2024"}
                subRedditName={thePost.community}
                subRedditPicture={theSub.image}
                subRedditDescription={theSub.description}
                banner={theSub.communityBanner}
                subRedditRules={theSub.rules}
                time={parseTime(thePost.date)}
                title={thePost.title}
                description={
                  thePost.content[thePost.content.length - 1]
                    ? thePost.content[thePost.content.length - 1]
                    : ""
                }
                attachments={thePost.attachments}
                upVotes={thePost.votesUpCount - thePost.votesDownCount}
                pollVote={
                  thePost.hasVotedOnPoll === true
                    ? thePost.selectedPollOption
                    : ""
                }
                comments={thePost.commentsCount}
                userName={thePost.username}
                isSpoiler={thePost.isSpoiler}
                isSaved={thePost.isSaved}
                isNSFW={thePost.isNsfw}
                pollOptions={thePost.pollOptions}
                pollIsOpen={thePost.isPollEnabled}
                pollExpiration={
                  thePost.pollExpiration ? thePost.pollExpiration : ""
                }
                sendReplyNotifications={thePost.sendPostReplyNotification}
                isJoined={joined}
                onJoin={handleJoin}
                isMember={subscribe.isSubscribed}
                upVoteStatus={
                  thePost.hasUpvoted
                    ? "upvoted"
                    : thePost.hasDownvoted
                      ? "downvoted"
                      : "neutral"
                }
                Editing={isEditing}
                isApproved={thePost.isApproved}
                isRemoved={thePost.isRemoved}
                isSpam={thePost.isSpam}
                isCommentsLocked={thePost.isCommentsLocked}
              />
            </div>
            <div className={styles.inputarea}>
              {addingComment && (
                <CommentInput
                  onComment={onComment}
                  close={() => {
                    setAddingComment(false);
                  }}
                  buttonDisplay={"comment"}
                  isPost={false}
                />
              )}
              {!thePost.isCommentsLocked && !addingComment && (
                <button
                  className={styles.addcommentbutton}
                  onClick={() => {
                    setAddingComment(true);
                  }}
                >
                  Add Comment
                </button>
              )}
            </div>

            {!loadingComments && comments.length !== 0 && (
              <div>
                {comments.map((comment) => (
                  <div>
                    <Comment
                      comment={comment}
                      subRedditName={thePost.community}
                      subRedditPicture={theSub.image}
                      subRedditRules={theSub.rules}
                      showProfilePicture={true}
                      isModerator={isModerator}
                      postLocked={thePost.isCommentsLocked}
                      postId={postId}
                    />
                  </div>
                ))}
              </div>
            )}
            {!loadingComments && comments.length === 0 && (
              <p>Be the first to add a comment</p>
            )}
            {loadingComments && comments.length === 0 && (
              <p>loading the comments.....</p>
            )}
          </div>
          <div className={styles.rightbar}>
            <RightCommentsSidebar
              name={thePost.community}
              description={theSub.description}
              rules={theSub.rules}
              members={theSub.membersCount}
              isJoined={joined}
              onJoin={handleJoin}
              moderators={theSub.moderators}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
