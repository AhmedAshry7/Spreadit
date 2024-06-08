"use client";
import React from "react";
import { useState } from "react";
import Post from "../../../components/post/Post";
import Sidebar from "../../../components/UI/Sidebar";
import ToolBar from "../../../components/UI/Toolbar";
import MyProfileInfo from "../../MyProfileInfo";
import ProfileInfo from "../../ProfileInfo";
import ProfileBar from "../../ProfileBar";
import Image from "next/image";
import { useRouter } from "next/navigation";

import profilepicture from "@/app/assets/PP1.png";
import addPhotoIcon from "@/app/assets/add-photo.svg";
import styles from "../../Profile.module.css";
import getCookies from "../../../utils/getCookies";
import { useEffect } from "react";

import apiHandler from "../../../utils/apiHandler";
import parseTime from "../../../utils/timeDifference";
import Comment from "@/app/components/UI/Comment";

import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

function Profile({ params: { username } }) {
  const router = useRouter();
  const [selected, setSelected] = React.useState(2);
  const [token, setToken] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  const [avatar, setAvatar] = React.useState(profilepicture);
  const [isMe, setIsMe] = React.useState(false);
  const [postArray, setPostArray] = useState([]);
  const [subArray, setSubArray] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);

        if (cookies.username === username) {
          setIsMe(true);
          setAvatar(cookies.avatar);
        } else {
          //check if the user exists or not
          try {
            
            const userInfo = await apiHandler(
              `/user/profile-info/${username}`,
              "GET",
              "",
              cookies.access_token,
            );
            setAvatar(userInfo.avatar);
            setIsMe(false);
          } catch (err) {
            router.push("/404");
          }
        }
      } else {
        // router.push("/login")
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomOfPage = scrollTop + clientHeight + 200 >= scrollHeight;

    setReachedEnd(bottomOfPage);
  };

  useEffect(() => {
    async function getComments() {
      if (token === null) {
        return;
      }
      try {
        const response = await apiHandler(
          `/comments/user/${username}`,
          "GET",
          "",
          token,
        );
        const tempComments = response.comments;
        
        const commentsArrPromisses = tempComments.map(async (comment) => {
          return apiHandler(
            `/community/${comment.community_title}/get-info`,
            "GET",
            "",
            token,
          );
        });
        const communityInfos = await Promise.all(commentsArrPromisses);
        const CommentsData = tempComments.map((comment, index) => ({
          ...comment,
          ...communityInfos[index],
        }));

        
        setComments(CommentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getComments();
  }, [token]);

  return (
    <div className={styles.profile_container}>
      <ToolBar page={`u/${username}`} loggedin={true} />

      <div className={styles.main_container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        <div className={styles.profile}>
          <div className={styles.profile_header}>
            <div className={styles.profile_banner}>
              <div className={styles.profile_picture}>
                <Image
                  src={avatar}
                  width={64}
                  height={64}
                  style={{
                    overflow: "hidden",
                    borderRadius: "624.9375rem",
                    borderStyle: "solid",
                    borderColor: "#0000001a",
                  }}
                  alt="profile picture"
                />
                <div
                  className={styles.circle}
                  onClick={() => {
                    router.push("/settings/profile");
                  }}
                >
                  <Image
                    src={addPhotoIcon}
                    width={16}
                    height={16}
                    alt="Post Options"
                  />
                </div>
              </div>

              <div className={styles.profile_name}>
                <h1 className={styles.username_header}>{username}</h1>
                <p className={styles.username}>u/{username}</p>
              </div>
            </div>

            <ProfileBar
              selected={selected}
              setSelected={setSelected}
              isMe={isMe}
              username={username}
            />

            <div className={styles.posts}>
              {comments.map((comment) => (
                <div
                  onClick={() => {
                    router.push(`/comments/${comment.post_id}`);
                  }}
                  className={styles.comment_container}
                >
                  <div className={styles.community_title}>
                    <Image
                      src={comment.image}
                      width={28}
                      height={28}
                      style={{
                        overflow: "hidden",
                        borderRadius: "624.9375rem",
                        marginRight: "4px",
                      }}
                      alt="Community picture"
                    />
                    <p style={{ margin: "0" }}>r/{comment.community_title}</p>
                  </div>
                  <div className={styles.comment_body}>
                    <Comment
                      comment={comment}
                      subRedditName={comment?.community_title}
                      subRedditPicture={comment?.image}
                      subRedditRules={comment.rules}
                      showProfilePicture={false}
                    />
                  </div>
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
          </div>

          <div className={styles.profile_info_container}>
            <div className={styles.profile_info}>
              {isMe ? (
                <MyProfileInfo username={username} />
              ) : (
                <ProfileInfo username={username} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
