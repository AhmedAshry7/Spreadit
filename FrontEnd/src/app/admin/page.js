"use client";
import React, { useState, useEffect } from "react";
import ToolBar from "../components/UI/Toolbar";
import Sidebar from "../components/UI/Sidebar";
import Post from "../components/post/Post";
import Comment from "../components/UI/Comment";
import AdminBar from "./AdminBar";
import styles from "./admin.module.css";
import getCookies from "../utils/getCookies";
import apiHandler from "../utils/apiHandler";
import parseTime from "../utils/timeDifference";
import AdminModal from "./AdminModal";
import Image from "next/image";
import expandIcon from "../assets/expand.svg";

function Admin() {
  const [selected, setSelected] = useState(0);
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    username: "",
    id: "",
    type: "",
    id: -1,
    index: -1,
    reports: [],
  });

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
        const postsPromise = apiHandler(
          "/dashboard/posts",
          "GET",
          "",
          cookies.access_token
        );
        const commentsPromise = apiHandler(
          "/dashboard/comments",
          "GET",
          "",
          cookies.access_token
        );
        const [postsData, commentsData] = await Promise.all([
          postsPromise,
          commentsPromise,
        ]);

        setPosts(postsData.reportedPosts);
        setComments(commentsData.reportedComments);
      } else {
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  async function handleRemove(id, type, index) {
    const url =
      type === "post" ? `/posts/${id}` : `/posts/comment/delete/${id}`;
    const response = await apiHandler(url, "DELETE", "", token);

    if (response.message.includes("successfully")) {
      type === "post"
        ? setPosts(posts.filter((post, i) => i !== index))
        : setComments(comments.filter((comment, i) => i !== index));
    } else {
      alert(`could not delete the ${type}`);
    }
  }

  return (
    <div className={styles.admin_container}>
      <ToolBar page={"Spreadit"} loggedin={true} />

      {showModal ? (
        <AdminModal
          setShowModal={setShowModal}
          username={modalInfo.username}
          id={modalInfo.id}
          index={modalInfo.index}
          type={modalInfo.type}
          reports={modalInfo.reports}
          token={token}
          handleRemove={handleRemove}
        />
      ) : null}
      <div className={styles.main_container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        <div className={styles.no_grid}>
          <div style={{ margin: "60px 0 0 0" }}>
            <h1 className={styles.admin_header}>Admin Panel</h1>
            <AdminBar setSelected={setSelected} selected={selected} />

            {selected === 0
              ? posts.map((post, index) => {
                  return (
                    <div className={styles.media_and_reports}>
                      <div className={styles.media_container}>
                        <Post
                          postId={post._id}
                          subRedditName={post.community}
                          subRedditPicture={post.communityIcon}
                          subRedditDescription={""}
                          banner={""}
                          subRedditRules={""}
                          time={parseTime(post.date)}
                          title={post.title}
                          description={
                            post.content[post.content.length - 1]
                              ? post.content[post.content.length - 1]
                              : ""
                          }
                          attachments={post.attachments}
                          upVotes={post.votesUpCount - post.votesDownCount}
                          comments={post.commentsCount}
                          userName={post.username}
                          isSpoiler={post.isSpoiler}
                          isNSFW={post.isNsfw}
                          isSaved={post.isSaved}
                          pollOptions={post.pollOptions}
                          pollIsOpen={post.isPollEnabled}
                          pollExpiration={
                            post.pollExpiration ? post.pollExpiration : ""
                          }
                          sendReplyNotifications={
                            post.sendPostReplyNotification
                          }
                          isMember={true}
                        />
                      </div>
                      <div className={styles.reports_container}>
                        <h1 className={styles.reports_header}>
                          Reports {`(${post.reports.length})`}{" "}
                          <button
                            onClick={() => {
                              setShowModal(true);
                              setModalInfo({
                                username: post.username,
                                id: post._id,
                                type: "post",
                                index: index,
                                reports: post.reports,
                              });
                            }}
                            className={styles.expand_btn}
                          >
                            <Image
                              src={expandIcon}
                              width={20}
                              height={20}
                              alt="expand Icon"
                            />
                          </button>
                        </h1>
                        <div>
                          <span>{post.reports[0].username}</span> reported this
                          post for {post.reports[0].reason}
                        </div>
                      </div>
                    </div>
                  );
                })
              : comments.map((comment, index) => {
                  return (
                    <div className={styles.media_and_reports}>
                      <div className={styles.media_container}>
                        <Comment
                          comment={comment}
                          subRedditName={comment?.community_title}
                          subRedditPicture={comment?.image}
                          subRedditRules={comment?.rules}
                          showProfilePicture={false}
                        />
                      </div>

                      <div className={styles.reports_container}>
                        <h1 className={styles.reports_header}>
                          Reports {`(${comment.reports.length})`}{" "}
                          <button
                            onClick={() => {
                              setShowModal(true);
                              setModalInfo({
                                username: comment.username,
                                id: comment.id,
                                type: "comment",
                                index: index,
                                reports: comment.reports,
                              });
                            }}
                            className={styles.expand_btn}
                          >
                            <Image
                              src={expandIcon}
                              width={20}
                              height={20}
                              alt="expand Icon"
                            />
                          </button>
                        </h1>
                        <div>
                          <span>{comment.reports[0].username}</span> reported
                          this comment for {comment.reports[0].reason}
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
