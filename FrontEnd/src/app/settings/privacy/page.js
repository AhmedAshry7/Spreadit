"use client";
import React, { useEffect, useState } from "react";
import styles from "../account/page.module.css";
import Layout from "../SettingsLayout";
import Blockmute from "../../components/UI/Blockmute";
import Blockedmuted from "../../components/UI/Blockedmuted";
import apiHandler from "../../utils/apiHandler";
import getCookies from "../../utils/getCookies";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [temporaryToken, setToken] = useState(null);
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

  //const temporaryToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M";
  const [userData, setUserData] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [mutedCommunities, setMutedCommunities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (temporaryToken === null) {
        return;
      }
      try {
        const response = await apiHandler(
          `/settings/safety-privacy`,
          "GET",
          "",
          temporaryToken,
        ); //todo change api endpoint according to sortBy state
        
        setUserData(response);
        
        setBlockedUsers(response.blockedUsers);
        setMutedCommunities(response.mutedCommunities);
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, [temporaryToken]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const updateblocked = (newName) => {
    const newBlockedUsers = [...blockedUsers, { profilename: newName }];
    setBlockedUsers(newBlockedUsers);
    updatePrivacySettings(newName, "");
  };

  const updatemuted = (newName) => {
    const newMutedCommunities = [...mutedCommunities, { profilename: newName }];
    setMutedCommunities(newMutedCommunities);
    updatePrivacySettings("", newName);
  };
  const updatePrivacySettings = async (
    newBlockedUsers,
    newMutedCommunities,
  ) => {
    try {
      const response = await apiHandler(
        `/settings/safety-privacy`,
        "PUT",
        {
          blockedUsername: newBlockedUsers,
          mutedCommunityname: newMutedCommunities,
        },
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error updating privacy settings:", error.message);
    }
  };

  const removeProfile = async (profilenameToRemove) => {
    const newBlockedUsers = blockedUsers.filter(
      (profile) => profile.profilename !== profilenameToRemove,
    );
    setBlockedUsers(newBlockedUsers);
    updatePrivacySettings(profilenameToRemove, "");
  };

  const removeProfile2 = async (profilenameToRemove) => {
    const newMutedCommunities = mutedCommunities.filter(
      (profile) => profile.profilename !== profilenameToRemove,
    );
    setMutedCommunities(newMutedCommunities);
    updatePrivacySettings("", profilenameToRemove);
  };

  return (
    <div className={styles.App}>
      <div className={styles.bigcontainer}>
        <Layout index={2} />
        <div className={styles.sectioncontainer}>
          <div className={styles.sectionname}>
            <h1 className={styles.accountheader}>Safety & Privacy</h1>
            <p className={styles.description}>
              Manage how we use data to personalize your Reddit experience, and
              control how other redditors interact with you. To learn more,
              visit our
              <a href="https://support.reddithelp.com/hc/en-us/categories/360003246511">
                Privacy & Security FAQs
              </a>
              .
            </p>
            <h3 className={styles.subheader}>SAFETY</h3>
            <hr className={styles.line}></hr>
          </div>
          <Blockmute
            type="People You’ve Blocked"
            description="Blocked people can’t send you chat requests or private messages."
            onAdd={(newName) => updateblocked(newName)}
            inputmsg="BLOCK NEW USER"
          />
          {blockedUsers.map((profile, index) => (
            <Blockedmuted
              key={index}
              avatar={profile.avatar}
              profilename={profile.username}
              path={index % 2 == 0 ? 1 : 2}
              onRemove={removeProfile}
            />
          ))}
          <Blockmute
            type="Communities You've Muted"
            description="Posts from muted communities won't show up in your feeds or recommendations."
            onAdd={(newName) => updatemuted(newName)}
            inputmsg="MUTE NEW COMMUNITY"
          />
          {mutedCommunities.map((profile, index) => (
            <Blockedmuted
              key={index}
              profilename={profile.profilename}
              path={index % 2 == 0 ? 1 : 2}
              onRemove={removeProfile2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
