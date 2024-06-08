"use client";
import "./Queue.css";
import List from "@/app/components/UI/Listbutton";
import { useState, useEffect } from "react";
import EmptyQueue from "./EmptyQueue";
import QueuedPost from "./QueuedPost";
import handler from "@/app/utils/apiHandler.js";
import getCookies from "@/app/utils/getCookies";
import { TailSpin } from "react-loader-spinner";

/**
 * Component for rendering the queue of posts and comments in a community
 * @component
 * @param   {Object} params                    Parameters passed to the component
 * @param   {string} params.communityName      The name of the community
 * @returns {JSX.Element}                      The rendered Queue component.
 *
 * @example
 * // To render the Queue component:
 * // Ensure to pass the communityName as a parameter
 * <Queue params={{ communityName: 'announcements' }} />
 */
function Queue({ params: { communityName } }) {
  const [token, setToken] = useState(null);
  const [selectedOption, setSelectedOption] = useState("spam");
  const [sort, setSort] = useState("Newest First");
  const [type, setType] = useState("Posts And Comments");
  const [loading, setLoading] = useState(true); // Loading indicator
  const [postArray, setPostArray] = useState([
    /*
    {
      communityName: 'announcements',
      title: 'test post',
      commentContent: "this is a comment!",
      username: 'TestUserxD',
      date: '2024-04-30T21:00:00.000Z',
      type: 'comment',
      commentsCount: 1,
      votesUpCount: 0,
      votesDownCount: 0,
      _id: 1,
      reports: -1,
    },
    {
      communityName: 'announcements',
      title: 'test post',
      username: 'TestUserxD',
      date: '2024-05-30T21:00:00.000Z',
      commentsCount: 1,
      votesUpCount: 0,
      votesDownCount: 0,
      _id: 13242,
      reports: 100,
    },
    {
      communityName: 'announcements',
      title: 'test post',
      username: 'TestUserxD',
      date: '2024-01-30T21:00:00.000Z',
      commentsCount: 1,
      votesUpCount: 0,
      votesDownCount: 0,
      _id: 555,
      reports: 0,
    },
    {
      communityName: 'announcements',
      title: 'test post',
      username: 'TestUserxD',
      date: '2024-02-30T21:00:00.000Z',
      commentsCount: 1,
      votesUpCount: 0,
      votesDownCount: 0,
      _id: 1342,
      reports: 1,
    },
    {
      communityName: 'announcements',
      title: 'tesdwwq post',
      username: 'TestUserxD',
      date: '2024-03-30T21:00:00.000Z',
      commentsCount: 13,
      votesUpCount: 101,
      votesDownCount: 0,
      _id: 11221,
      reports: 3221,
    }
  */
  ]);
  const [removalList, setRemovalList] = useState(["None"]);
  const [apiCount, setApiCount] = useState(0);

  useEffect(() => {
    const delay = 1500;
    const timeoutId = setTimeout(() => {
      getPost();
      getComment();
      sortPosts();
    }, delay);
  }, [token, selectedOption]);

  useEffect(() => {
    sortPosts();
    
  }, [sort]);

  const operation = () => {
    switch (selectedOption) {
      case "spam":
        return "get-spam-";
      case "edited":
        return "get-edited-";
      case "unmoderated":
        return "unmoderated-";
      case "reported":
        return "get-reported-";
    }
  };

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

  async function getRules() {
    //setLoading(true);
    try {
      const rules = await handler(
        `/community/${communityName}/removal-reasons`,
        "GET",
        "",
        token,
      );
      const concatenatedRules = rules.map(
        (rule) => `${rule.title} - ${rule.reasonMessage}`,
      );
      setRemovalList(["None", ...concatenatedRules]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      //setLoading(false);
    }
  }

  async function getPost() {
    setLoading(true);
    
    const opType = operation();
  try {
    const posts = await handler(
      `/community/moderation/${communityName}/${opType}posts`,
      "GET",
      "",
      token
    );
    let postsWithType;

    if (selectedOption === "spam") {
      const { filteredPostInfoArray } = posts;
      postsWithType = filteredPostInfoArray.map((post) => ({
        ...post,
        type: "post",
        commentContent: "",
        attachments:
          post.attachments.length !== 0
            ? post.attachments
            : [
                {
                  type: "placeholder",
                  link: "",
                  comId: "",
                },
              ],
      }));
    } else {
      postsWithType = posts.map((post) => ({
        ...post,
        type: "post",
        commentContent: "",
        attachments:
          post.attachments.length !== 0
            ? post.attachments
            : [
                {
                  type: "placeholder",
                  link: "",
                  comId: "",
                },
              ],
      }));
    }
    console.log(postsWithType);

    setPostArray((prevPosts) => [...prevPosts, ...postsWithType]);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
}

  async function getComment() {
    setLoading(true);
    
    const opType = operation();
    try {
      const comments = await handler(
        `/community/moderation/${communityName}/${opType}comments`,
        "GET",
        "",
        token,
      ); //todo change api endpoint according to sortBy state
      var transformedComments;
      if (selectedOption === "spam") {
        const { SpammedComments } = comments;
         transformedComments = SpammedComments.map(comment => ({
          "_id": comment.postId,
          "userId": [comment.user.id], // You might not have this information for comments
          "username": [comment.user.username], // You might not have this information for comments
          "userProfilePic": [comment.user.avatar_url], // You might not have this information for comments
          "hasUpvoted": [comment.is_upvoted], // You might not have this information for comments
          "hasDownvoted": [comment.is_downvoted], // You might not have this information for comments
          "hasVotedOnPoll": false, // You might not have this information for comments
          "selectedPollOption": "", // You might not have this information for comments
          "numberOfViews": 0, // You might not have this information for comments
          "votesUpCount": [comment.likes_count],
          "votesDownCount": 0, // You might not have this information for comments
          "sharesCount": 0, // Assuming replies_count represents shares count for comments
          "commentsCount": [comment.replies_count], // You might not have this information for comments
          "title": [comment.post_title], // You might not have this information for comments
          "commentContent": [comment.content],
          "content": [comment.content], // Place the comment content into an array
          "community": "", // You might not have this information for comments
          "communityIcon": [comment.user.avatar_url], // You might not have this information for comments
          "type": "comment",
          "pollOptions": [], // You might not have this information for comments
          "pollVotingLength": "", // You might not have this information for comments
          "pollExpiration": "", // You might not have this information for comments
          "isPollEnabled": false, // You might not have this information for comments
          "link": "", // You might not have this information for comments
          "attachments": [
            {
              type: comment.media[0] ? comment.media[0].type : "",
              link: comment.media[0] ? comment.media[0].link : "",
            },
          ],
          "isSpoiler": false, // You might not have this information for comments
          "isNsfw": false, // You might not have this information for comments
          "sendPostReplyNotification": false, // You might not have this information for comments
          "isCommentsLocked": false, // You might not have this information for comments
          "isSaved": false, // You might not have this information for comments
          "isRemoved": comment.is_removed, // You might not have this information for comments
          "removalReason": "", // You might not have this information for comments
          "isApproved": comment.is_approved, // You might not have this information for comments
          "isScheduled": false, // You might not have this information for comments
          "isSpam": false, // You might not have this information for comments
          "date": comment.created_at, // Use the created_at property of the comment as the date
          "comId": [comment.id],
        }));
      }
      else if (selectedOption === "reported")
        {
          const { reportedComments } = comments;
           transformedComments = reportedComments.map(comment => ({
            "_id": comment.postId,
            "userId": [comment.user.id], // You might not have this information for comments
            "username": [comment.user.username], // You might not have this information for comments
            "userProfilePic": [comment.user.avatar_url], // You might not have this information for comments
            "hasUpvoted": [comment.is_upvoted], // You might not have this information for comments
            "hasDownvoted": [comment.is_downvoted], // You might not have this information for comments
            "hasVotedOnPoll": false, // You might not have this information for comments
            "selectedPollOption": "", // You might not have this information for comments
            "numberOfViews": 0, // You might not have this information for comments
            "votesUpCount": [comment.likes_count],
            "votesDownCount": 0, // You might not have this information for comments
            "sharesCount": 0, // Assuming replies_count represents shares count for comments
            "commentsCount": [comment.replies_count], // You might not have this information for comments
            "title": [comment.post_title], // You might not have this information for comments
            "commentContent": [comment.content],
            "content": [comment.content], // Place the comment content into an array
            "community": "", // You might not have this information for comments
            "communityIcon": [comment.user.avatar_url], // You might not have this information for comments
            "type": "comment",
            "pollOptions": [], // You might not have this information for comments
            "pollVotingLength": "", // You might not have this information for comments
            "pollExpiration": "", // You might not have this information for comments
            "isPollEnabled": false, // You might not have this information for comments
            "link": "", // You might not have this information for comments
            "attachments": [
              {
                "type": comment.media[0] ? comment.media[0].type : "",
                "link": comment.media[0] ? comment.media[0].link : "",
              }
            ],
            "isSpoiler": false, // You might not have this information for comments
            "isNsfw": false, // You might not have this information for comments
            "sendPostReplyNotification": false, // You might not have this information for comments
            "isCommentsLocked": false, // You might not have this information for comments
            "isSaved": false, // You might not have this information for comments
            "isRemoved": comment.is_removed, // You might not have this information for comments
            "removalReason": "", // You might not have this information for comments
            "isApproved": comment.is_approved, // You might not have this information for comments
            "isScheduled": false, // You might not have this information for comments
            "isSpam": false, // You might not have this information for comments
            "date": comment.created_at, // Use the created_at property of the comment as the date
            "comId": [comment.id],
          }));
        }
        else if (selectedOption === "edited")
          {
            const { editedComment } = comments;
             transformedComments = editedComment.map(comment => ({
              "_id": comment.postId,
              "userId": [comment.user.id], // You might not have this information for comments
              "username": [comment.user.username], // You might not have this information for comments
              "userProfilePic": [comment.user.avatar_url], // You might not have this information for comments
              "hasUpvoted": [comment.is_upvoted], // You might not have this information for comments
              "hasDownvoted": [comment.is_downvoted], // You might not have this information for comments
              "hasVotedOnPoll": false, // You might not have this information for comments
              "selectedPollOption": "", // You might not have this information for comments
              "numberOfViews": 0, // You might not have this information for comments
              "votesUpCount": [comment.likes_count],
              "votesDownCount": 0, // You might not have this information for comments
              "sharesCount": 0, // Assuming replies_count represents shares count for comments
              "commentsCount": [comment.replies_count], // You might not have this information for comments
              "title": [comment.post_title], // You might not have this information for comments
              "commentContent": [comment.content],
              "content": [comment.content], // Place the comment content into an array
              "community": "", // You might not have this information for comments
              "communityIcon": [comment.user.avatar_url], // You might not have this information for comments
              "type": "comment",
              "pollOptions": [], // You might not have this information for comments
              "pollVotingLength": "", // You might not have this information for comments
              "pollExpiration": "", // You might not have this information for comments
              "isPollEnabled": false, // You might not have this information for comments
              "link": "", // You might not have this information for comments
              "attachments": [
                {
                  "type": comment.media[0] ? comment.media[0].type : "",
                  "link": comment.media[0] ? comment.media[0].link : "",
                }
              ],
              "isSpoiler": false, // You might not have this information for comments
              "isNsfw": false, // You might not have this information for comments
              "sendPostReplyNotification": false, // You might not have this information for comments
              "isCommentsLocked": false, // You might not have this information for comments
              "isSaved": false, // You might not have this information for comments
              "isRemoved": comment.is_removed, // You might not have this information for comments
              "removalReason": "", // You might not have this information for comments
              "isApproved": comment.is_approved, // You might not have this information for comments
              "isScheduled": false, // You might not have this information for comments
              "isSpam": false, // You might not have this information for comments
              "date": comment.created_at, // Use the created_at property of the comment as the date
              "comId": [comment.id],
            }));
          }
    // Assuming commentsArray is the array of comment objects retrieved from the API

      

      // Now, transformedComments is an array of objects with parameters similar to a post object but representing comments

      setPostArray((prevPosts) => [...prevPosts, ...transformedComments]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const typeList = ["Posts And Comments", "Posts", "Comments"];
  const sortList = ["Newest First", "Oldest First", "Most Reported First"];

  async function removePost(removeTitle, reason, postId, type) {
    let reasonData = {
      removalReason: reason,
    };
    
    

    try {
      const sentReason = await handler(
        `/community/moderation/${communityName}/${postId}/remove-${type}`,
        "POST",
        reasonData,
        token,
      );
      console.log(sentReason);
      window.alert(`${type !== "comment" ? "Post" : "Comment"} has been removed`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function lockPost(postId, type) {
    

    try {
      if (type === 'comment') {
      const sentReason = await handler(
        `/community/moderation/${communityName}/${postId}/lock-comment`,
        "POST",
        "",
        token
      );
    }
      else {
      const sentReason = await handler(
        `/posts/${postId}/lock`,
        "POST",
        "",
        token
      );
      
    }window.alert(`${type !== "comment" ? "Post" : "Comment"} has been locked`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function unlockPost(postId, type) {
    

    try {
      if (type === "comment") {
        const sentReason = await handler(
          `/community/moderation/${communityName}/${postId}/unlock-comment`,
          "POST",
          "",
          token,
        );
      } else {
        const sentReason = await handler(
          `/posts/${postId}/unlock`,
          "POST",
          "",
          token,
        );
        
      
      }window.alert(`${type !== "comment" ? "Post" : "Comment"} has been unlocked`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function approvePost(postId, type) {
    

    try {
      const sentReason = await handler(
        `/community/moderation/${communityName}/${postId}/approve-${type}`,
        "POST",
        "",
        token,
      );
      window.alert(`${type !== "comment" ? "Post" : "Comment"} has been approved`);
      setPostArray([]);
      getPost();
      getComment();
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function spamPost(postId, type) {
    

    try {
      const sentReason = await handler(
        `/community/moderation/${communityName}/spam-${type}/${postId}`,
        "POST",
        "",
        token,
      );
      window.alert(`${type !== "comment" ? "Post" : "Comment"} marked as spam`);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      case "Most Reported First":
        posts.sort((a, b) => b.reports - a.reports); // Assuming reports is a property in the post object
        break;
      default:
        break;
    }
    setPostArray(posts);
  }

  return (
    <div className="position">
      <div className="queueArea">
        <div className="areaSize">
          <div className="header">
            <div className="headerText">Queues</div>
            <div className="headerOptions">
              <button
                className={`headerOptionsItem ${selectedOption === "spam" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedOption("spam");
                  setPostArray([]);
                }}
              >
                Marked as Spam
              </button>
              <button
                className={`headerOptionsItem ${selectedOption === "reported" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedOption("reported");
                  setPostArray([]);
                }}
              >
                Reported
              </button>
              <button
                className={`headerOptionsItem ${selectedOption === "edited" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedOption("edited");
                  setPostArray([]);
                }}
              >
                Edited
              </button>
              <button
                className={`headerOptionsItem ${selectedOption === "unmoderated" ? "selected" : ""}`}
                onClick={() => {
                  setSelectedOption("unmoderated");
                  setPostArray([]);
                }}
              >
                Unmoderated
              </button>
            </div>
          </div>
          <div className="sortBarSize sortBarFlex">
            <List
              list={sortList}
              initialv={sort}
              choose={(item) => {
                setSort(item);
              }}
            />
            {/*
            <List
              list={typeList}
              initialv={type}
              choose={(item) => {
                setType(item);
              }}
            />*/}
          </div>
          <div>
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
                  Retreiving Posts and Comments...
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
            {postArray.length === 0 ? (
              !loading && <EmptyQueue />
            ) : (
              <div>
                <div>
                  {postArray.map((postObject, index) => (
                    <QueuedPost
                      approveFunction={approvePost}
                      removeFunction={removePost}
                      spamFunction={spamPost}
                      lockFunction={lockPost}
                      unlockFunction={unlockPost}
                      getReasonsFunction={getRules}
                      removeReasons={removalList}
                      key={index}
                      communityName={communityName}
                      title={postObject.title}
                      username={postObject.username}
                      time={postObject.date}
                      commentCount={postObject.commentsCount}
                      voteCount={
                        postObject.votesUpCount - postObject.votesDownCount
                      }
                      postId={postObject._id}
                      reports={postObject.reports}
                      type={postObject.type}
                      comment={postObject.commentContent}
                      commentId={postObject.comId}
                      icon={postObject.communityIcon}
                      mediaType={postObject.attachments[0].type}
                      mediaLink={postObject.attachments[0].link}
                    />
                  ))}
                </div>
                {/*
              <div className="nextBar nextBarBorder">
                <div className="nextBarFlex nextbarStyle">
                  <span className="nextButton">Back</span>
                  <span className="nextButton">Next</span>
                </div>
      </div>*/}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Queue;
