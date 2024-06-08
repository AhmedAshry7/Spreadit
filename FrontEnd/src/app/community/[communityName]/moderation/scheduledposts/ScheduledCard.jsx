import React, { useEffect, useState } from "react";
import styles from "./ScheduledCard.module.css";
import upvoteIcon from "@/app/assets/post-images/upvote-arrow.svg";
import downvoteIcon from "@/app/assets/post-images/downvote-arrow.svg";
import Image from "next/image";

/**
 * Component for rendering a scheduled post card in a community's scheduled posts section.
 * @component
 * @param   {string} communityName - The name of the community to which the scheduled post belongs.
 * @param   {string} post - The title of the scheduled post.
 * @param   {string} username - The username of the user who scheduled the post.
 * @param   {string} date - The date when the post is scheduled to be published.
 * @returns {JSX.Element} - The rendered ScheduledCard component.
 *
 * @example
 * // Renders a scheduled post card with provided details
 * <ScheduledCard
 *    communityName="announcements"
 *    post="TestPost"
 *    username="Testing"
 *    date="1970 January 1st"
 * />
 */
function ScheduledCard({
  communityName = "announcements",
  id = 69,
  post = "TestPost",
  username = "Testing",
  date = "1970 January 1st",
  removeFn = () => {},
  content = [""],
}) {
  return (
    <div>
      <div>
        <div className={styles.cardMargin}>
          <div className={styles.cardHeader}>
            <svg
              className={styles.icon}
              style={{
                marginRight: "8px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 11 11"
            >
              <g>
                <path
                  d="M5 3.75C5 3.47388 5.22363 3.25 5.5 3.25C5.77637 3.25 6 3.47388 6 3.75V5.53735L7.81689 6.58643C8.05615 6.72449 8.13818 7.03027 8 7.26941C7.86182 7.50861 7.55615 7.59052 7.31689 7.45245L5.25049 6.25934C5.07861 6.16028 4.98779 5.97504 5.00146 5.78992L5 5.75V3.75Z"
                  fill="inherit"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 5.5C11 8.53754 8.5376 11 5.5 11C2.4624 11 0 8.53754 0 5.5C0 2.46246 2.4624 0 5.5 0C8.5376 0 11 2.46246 11 5.5ZM10 5.5C10 7.98529 7.98535 10 5.5 10C3.01465 10 1 7.98529 1 5.5C1 3.01471 3.01465 1 5.5 1C7.98535 1 10 3.01471 10 5.5Z"
                  fill="inherit"
                ></path>
              </g>
            </svg>
            <div>
              <div>
                This post is scheduled for
                <span className={styles.boldedSpan}>
                  {date.slice(0, 16).replace("T", " ")}
                </span>
              </div>
              <div>
                Scheduled by{" "}
                <span className={styles.boldedSpan}>{username}</span>
              </div>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div
              className={styles.placeholder}
              style={{ width: "40px", borderLeft: "4px solid transparent" }}
            >
              <div className={styles.placeholderContainer}>
                <button
                  style={{
                    cursor: "not-allowed",
                    backgroundColor: "transparent",
                    border: "transparent",
                  }}
                >
                  <Image
                    width={16}
                    height={16}
                    src={upvoteIcon}
                    alt="Upvote arrow"
                  />
                </button>
                <div className={styles.voteText}>Vote</div>
                <button
                  style={{
                    cursor: "not-allowed",
                    backgroundColor: "transparent",
                    border: "transparent",
                  }}
                >
                  <Image
                    width={16}
                    height={16}
                    src={downvoteIcon}
                    alt="Downvote arrow"
                  />
                </button>
              </div>
            </div>
            <div className={styles.cardBodyDetails}>
              <div className={styles.detailsFlex}>
                <div className={styles.preview}>
                  <div className={styles.previewSize}>
                    <div className={styles.previewImg}>
                      <svg
                        className={styles.icon}
                        style={{ verticalAlign: "middle" }}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.detailsFlex2}>
                  <div>
                    <span className={styles.titleSpan}>{post}</span>
                    <div className={styles.titleSpacing}></div>
                  </div>
                  <span className={styles.userSpan}>
                    <a
                      className={styles.communityLink}
                      href={`../../${communityName}`}
                    >
                      {communityName}
                    </a>
                    <span style={{ margin: "0 4px" }} role="presentation">
                      •
                    </span>
                    <a
                      className={styles.communityLink}
                      style={{ color: "inherit", fontWeight: "400" }}
                      href={`../../../profile/${username}`}
                    >
                      {username}
                    </a>
                  </span>
                  {content.length !== 0 && (
                    <div
                      style={{ marginBottom: "1em" }}
                      className="settings--p"
                    >
                      {content[0]}
                    </div>
                  )}
                  <span style={{ marginBottom: "6px" }}>
                    {/*
                    <span className={styles.postOption}>
                      <svg
                        className={styles.icon}
                        style={{ fill: "black" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5,15a1,1,0,0,1-1-1V11.17a1,1,0,0,1,.29-.7l8.09-8.09a1,1,0,0,1,1.41,0l2.83,2.83a1,1,0,0,1,0,1.41L8.54,14.71a1,1,0,0,1-.71.29Zm12,1a1,1,0,0,1,0,2H3a1,1,0,0,1,0-2Z"></path>
                      </svg>
                      Submit post now
                    </span>
                    <span className={styles.postOption}>
                      <svg
                        className={styles.icon}
                        style={{ fill: "black" }}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title id="undefined-title"></title>
                        <g>
                          <path
                            fill="inherit"
                            d="M15.75,7.834625 L12,4.084625 L12.808,3.276625 C13.8435,2.241125 15.5225,2.241125 16.558,3.276625 C17.5935,4.312125 17.5935,5.991125 16.558,7.026625 L15.75,7.834625 Z M11.366,5 L15.116,8.75 L7.25,16.616 L3.5,12.866 L11.366,5 Z M2.5035,13.5 L6.1125,17.109 L1,18.6125 L2.5035,13.5 Z"
                          ></path>
                        </g>
                      </svg>
                      Edit
                    </span>*/}
                    <span
                      className={styles.postOption}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this scheduled post?",
                          )
                        ) {
                          removeFn(id);
                        }
                      }}
                    >
                      <svg
                        className={styles.icon}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.5,2H12.71l-.85-.85A.5.5,0,0,0,11.5,1h-3a.5.5,0,0,0-.35.15L7.29,2H3.5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-1A.5.5,0,0,0,16.5,2Z"></path>
                        <path d="M16.5,5H3.5a.5.5,0,0,0-.5.5v12A1.5,1.5,0,0,0,4.5,19h11A1.5,1.5,0,0,0,17,17.5V5.5A.5.5,0,0,0,16.5,5ZM6.75,15.5a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Z"></path>
                      </svg>
                      Delete
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduledCard;
