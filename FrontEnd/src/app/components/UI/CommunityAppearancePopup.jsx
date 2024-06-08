import React, { useState, useEffect } from "react";
import styles from "./CommunityAppearancePopup.module.css";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import getCookies from "@/app/utils/getCookies";

/**
 * Component representing a popup for editing community appearance
 * @component
 * @param {Object} props Component props
 * @param {Function} props.onClose Function to close the popup
 * @param {string} props.communityName The name of the community
 * @param {Object} props.communityData Data about the community
 * @param {string} props.avatar The URL of the community's avatar
 * @param {string} props.communityBanner The URL of the community's banner
 * @returns {JSX.Element} JSX element representing a popup for editing community appearance
 *
 * @example
 *  let awwpfp= "@/app/assets/awwpfp.jpg";
 * <CommunityAppearancePopup
 *   onClose={console.log("close modal")}
 *   communityName="exampleCommunity"
 *   communityData={{ communityType: "public", description: "description of a community" }}
 *   avatar={awwpfp}
 *   communityBanner={awwpfp}
 * />
 */

function CommunityAppearancePopup({
  onClose,
  communityName,
  communityData,
  avatar,
  communityBanner,
}) {
  const [pfp, setPfp] = useState("");
  const [banner, setBanner] = useState("");
  const [oldBanner, setOldBanner] = useState(banner);
  const [oldpfp, setOldPfp] = useState(avatar);
  const [goTo, setGoTo] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.avatar) {
        setToken(cookies.access_token);
      } else {
        redirect("/login");
      }
    }
    fetchData();
  }, []);

  const onInputChange = (e) => {
    setPfp(e.target.files[0]);
  };
  const onInputChangebanner = (e) => {
    setBanner(e.target.files[0]);
  };
  const submitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pfp", pfp);
  };

  async function patchData() {
    try {
      const formData = new FormData();

      formData.append("name", communityName);
      formData.append("is18plus", false);
      formData.append("communityType", communityData.communityType);
      formData.append("description", communityData.description);
      formData.append("fileType", "image");
      formData.append("membersNickname", "Members");
      formData.append("image", pfp);
      formData.append("communityBanner", banner || "");

      
      // Fetch user preferences
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/community/${communityName}/edit-info `,
        {
          method: "POST",
          headers: {
            Authorization: ` Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message, retry mechanism)
    }
  }

  return (
    <div className={styles.popup}>
      <div className={styles.content}>
        <div className={styles.titlebox}>
          {!goTo ? (
            ""
          ) : (
            <div className={styles.backbutton} onClick={() => setGoTo("")}>
              <ArrowBackIosNewRoundedIcon className={styles.backbuttonsize} />
            </div>
          )}
          <h2 className={styles.title}>
            Edit Community{" "}
            {goTo == "avatar"
              ? "Avatar"
              : goTo == "banner"
                ? "Banner"
                : "Appearance"}
          </h2>
          <div className={styles.closebutton} onClick={onClose}>
            <CloseOutlinedIcon />
          </div>
        </div>
        <hr></hr>
        {goTo == "avatar" ? (
          <div>
            <input
              className={styles.uploadinput}
              type="file"
              accepts="image/*"
              onChange={onInputChange}
            />
            {pfp ? (
              <Image
                className={styles.pfp}
                src={URL.createObjectURL(pfp)}
                alt="Community pfp"
                width={80}
                height={80}
              />
            ) : (
              <Image
                className={styles.pfp}
                src={oldpfp}
                alt="Community pfp"
                width={80}
                height={80}
              />
            )}
          </div>
        ) : goTo == "banner" ? (
          <div>
            <input
              className={styles.uploadinput}
              type="file"
              accepts="image/*"
              onChange={onInputChangebanner}
            />

            {banner ? (
              <Image
                className={styles.banner}
                src={URL.createObjectURL(banner)}
                alt="Community pfp"
                width={300}
                height={70}
              />
            ) : (
              <Image
                className={styles.banner}
                src={oldBanner}
                alt="Community banner"
                width={300}
                height={70}
              />
            )}
          </div>
        ) : (
          <ul className={styles.list}>
            <li className={styles.option} onClick={() => setGoTo("avatar")}>
              Avatar
            </li>
            <li className={styles.option} onClick={() => setGoTo("banner")}>
              Banner
            </li>
          </ul>
        )}
        <hr></hr>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
        {!goTo ? (
          ""
        ) : (
          <button className={styles.save} onClick={() => patchData()}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default CommunityAppearancePopup;
