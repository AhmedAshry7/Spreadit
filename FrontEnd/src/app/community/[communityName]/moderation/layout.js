"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler";
import styles from "../../../profile/Profile.module.css";
import ModSidebar from "./ModSidebar";
import ToolBar from "@/app/components/UI/Toolbar";
import Image from "next/image";
import notModImage from "@/app/assets/mod-images/remember-the-human.png";
import snooImage from "@/app/assets/mod-images/snoo.png";
import { TailSpin } from "react-loader-spinner";
import { set } from "date-fns";

export default function ModLayout({ children, params: { communityName } }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [isMod, setIsMod] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token || !cookies.username) {
        router.push("/login");
      } else {
        try {
          setToken(cookies.access_token);
          setUsername(cookies.username);
          const isMod = await apiHandler(
            `/community/moderation/${communityName}/${cookies.username}/is-moderator`,
            "GET",
            "",
            cookies.access_token,
          );
          setIsMod(isMod.isModerator);
          if (!isMod.isModerator) {
            const isInvited = await apiHandler(
              `/community/moderation/${communityName}/${cookies.username}/is-invited`,
              "GET",
              "",
              cookies.access_token,
            );
            setIsInvited(isInvited.isInvited);
          }
        } catch (err) {
          setIsMod(false);
          setIsInvited(false);
        } finally {
          setLoading(false);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [reload]);

  const handleDecline = async () => {
    const response = await apiHandler(
      `/community/moderation/${communityName}/decline-invite`,
      "POST",
      "",
      token,
    );
    
  };

  const handleAccept = async () => {
    const response = await apiHandler(
      `/community/moderation/${communityName}/accept-invite`,
      "POST",
      "",
      token,
    );
    setReload((prevReload) => !prevReload);
    setIsInvited(false);
    
  };

  let content = null;
  if (loading) {
    content = (
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
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
        }}
        wrapperClass=""
      />
    );
  } else if (!isMod && !isInvited) {
    content = (
      <div className={styles.not_mod_container}>
        <Image
          src={notModImage}
          alt="Not a moderator"
          width={225}
          height={120}
          style={{ margin: "0 auto 24px;" }}
        />
        Sorry, this is a moderator-only page
        <div className={styles.not_mod_text}>
          You must be a moderator of r/{communityName} to view this page
        </div>
      </div>
    );
  } else if (isInvited) {
    content = (
      <div className={styles.invited_container}>
        <div className={styles.invite_card}>
          <div className={styles.message_container}>
            <div className={styles.image_container}>
              <Image
                src={snooImage}
                alt="Not a moderator"
                width={72}
                height={72}
              />
            </div>
            <div className={styles.invite_message}>
              You have been invited to moderate r/{communityName}
            </div>
          </div>
          <footer className={styles.invite_footer}>
            <button onClick={handleDecline} className={styles.action_button2}>
              Decline
            </button>
            <button onClick={handleAccept} className={styles.action_button}>
              Accept
            </button>
          </footer>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={styles.profile_container}>
        <ToolBar page={communityName} loggedin={true} />

        <div className={styles.main_container}>
          <div className={styles.sidebar}>
            <ModSidebar communityName={communityName} />
          </div>

          <div className={styles.no_grid}>
            <div style={{ margin: "60px 0 0 0" }}>{children}</div>
          </div>
        </div>
      </div>
    );
  }

  return content;
}
