"use client";
import "./Settings.css";
import List from "@/app/components/UI/Listbutton";
import Toogle from "@/app/components/UI/Switch";
import React, { useState, useEffect } from "react";
import OutlineButton from "@/app/components/UI/OutlineButton";
import CommunityImages from "./CommunityImages";
import handler from "@/app/utils/apiHandler.js";
import getCookies from "@/app/utils/getCookies";
import { TailSpin } from "react-loader-spinner"

/**
 * Component for managing community settings including post and comment settings
 * @component
 * @param   {Object} params                    Parameters passed to the component
 * @param   {string} params.communityName      The name of the community
 * @returns {JSX.Element}                      The rendered Settings component.
 *
 * @example
 * // To render the Settings component:
 * // Ensure to pass the communityName as a parameter
 * <Settings params={{ communityName: 'yourCommunityName' }} />
 */
function Settings({ params: { communityName } }) {
  const [token, setToken] = useState(null);
  const [postTypeDescOn, setPostTypeDescOn] = useState(false);
  const [postType, setPostType] = useState("");
  const [crosspostEnabled, setCrosspostEnabled] = useState(true);
  const [postArchivingEnabled, setPostArchivingEnabled] = useState(true);
  const [spoilerEnabled, setSpoilerEnabled] = useState(true);
  const [linkToImageHostingAllowed, setLinkToImageHostingAllowed] =
    useState(true);
  const [multipleImagesPerPostAllowed, setMultipleImagesPerPostAllowed] =
    useState(true);
  const [pollsAllowed, setPollsAllowed] = useState(true);

  const [commentSettings, setCommentSettings] = useState({
    mediaInCommentsAllowed: true,
  });

  const [communityInfo, setCommunityInfo] = useState({
    image: null,
    communityBanner: null,
  });

  const [loading, setLoading] = useState(true); // Loading indicator
  const postTypeList = ["Any", "Links Only", "Text Posts Only"];
  const sortList = [
    "None (Recommended)",
    "Best",
    "Old",
    "Top",
    "Q&A",
    "Live (Beta)",
    "Controversial",
    "New",
  ];

  const postTypeDescription = () => {
    if (postType === "Any") return "Any post type is allowed";
    else if (postType === "Links Only")
      return "Only links to external sites are allowed";
    else if (postType === "Text Posts Only")
      return "Only text posts are allowed";
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

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch user preferences
        const prefsData = await handler(
          `/community/${communityName}/settings`,
          "GET",
          "",
          token,
        );
        setPostType(prefsData.postTypeOptions);
        setCrosspostEnabled(prefsData.crosspostEnabled);
        setPostArchivingEnabled(prefsData.postArchivingEnabled);
        setSpoilerEnabled(prefsData.spoilerEnabled);
        setLinkToImageHostingAllowed(prefsData.linkToImageHostingAllowed);
        setMultipleImagesPerPostAllowed(prefsData.multipleImagesPerPostAllowed);
        setPollsAllowed(prefsData.pollsAllowed);
        setCommentSettings(prefsData.commentSettings);
        
        
        const communityInfo = await handler(
          `/community/${communityName}/get-info`,
          "GET",
          "",
          token,
        );
        
        setCommunityInfo(communityInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message, retry mechanism)
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }

    fetchData();
  }, [token]);

  async function patchData() {
    let newPrefsData = {
      postTypeOptions: postType.toLowerCase(),
      spoilerEnabled: spoilerEnabled,
      multipleImagesPerPostAllowed: multipleImagesPerPostAllowed,
      pollsAllowed: pollsAllowed,
      commentSettings: commentSettings,
    };
    

    try {
      // Fetch user preferences
      const prefsData = await handler(
        `/community/${communityName}/settings/`,
        "PUT",
        newPrefsData,
        token,
      );
      

      const formData = new FormData();
      formData.append("image", communityInfo.image || "");
      formData.append("communityBanner", communityInfo.communityBanner || "");

      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${communityName}/edit-info`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      //updateAvatar(responseData.userObj.avatar_url);
      
      /*const newInfo = await handler(
        `/community/${communityName}/edit-info`,
        "POST",
        communityInfo,
        token
      );
      console.log(newInfo);*/

      window.alert(`New settings have been saved`);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message, retry mechanism)
    }
  }

  const updateBanner = (banner) => {
    setCommunityInfo((prevState) => ({
      ...prevState,
      communityBanner: banner,
    }));
  };

  const updateAvatar = (avatar) => {
    setCommunityInfo((prevState) => ({
      ...prevState,
      image: avatar,
    }));
  };

  useEffect(() => {
    if (postType === "any") setPostType("Any");
    else if (postType === "links only") setPostType("Links Only");
    else if (postType === "text posts only") setPostType("Text Posts Only");
  }, [postType]);

  return (
    <div className="pageSize pagePadding">
      <div className="saveHeader pt-sm fixed">
        <OutlineButton isInverted={true} btnClick={patchData}>
          Save Changes
        </OutlineButton>
      </div>
      <div className="pageBodyBorder">
        <div className="pageBody">
        
              {loading  ? (
              <div style={{display:"flex", alignItems:"center",gap:"1em", margin:"auto auto 1em auto"}}>
                Retreiving Community Settings...
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
              </div>
            ) :
            <>
          <div className="pageBodyHeader">Post and Comment settings</div>
          <h3 className="uppercase-h3-description">
            Community Avatar and Banner
          </h3>
          <CommunityImages
            setAvatar={updateAvatar}
            setBanner={updateBanner}
            bannerUrl={communityInfo.communityBanner}
            avatarUrl={communityInfo.image}
          />
          <h3 className="uppercase-h3-description">Posts</h3>
          <List
            description={postTypeDescOn ? postTypeDescription() : ""}
            list={postTypeList}
            initialv={postType}
            type={`Post type options (Current: ${postType})`}
            displayedColor={"grey"}
            choose={(item) => {
              setPostType(item);
              setPostTypeDescOn(true);
            }}
          />
          <Toogle
            optionTitle={`Enable spoiler tag`}
            optionDescription="Media on posts with the spoiler tag are blurred"
            isToggled={spoilerEnabled}
            onToggle={() => setSpoilerEnabled(!spoilerEnabled)}
          />
          <Toogle
            optionTitle="Allow multiple images per post"
            isToggled={multipleImagesPerPostAllowed}
            onToggle={() =>
              setMultipleImagesPerPostAllowed(!multipleImagesPerPostAllowed)
            }
          />
          <Toogle
            optionTitle="Allow polls"
            isToggled={pollsAllowed}
            onToggle={() => setPollsAllowed(!pollsAllowed)}
          />
          <h3 className="uppercase-h3-description">Comments</h3>

          <Toogle
            optionTitle="Media in comments"
            isToggled={commentSettings.mediaInCommentsAllowed}
            onToggle={() =>
              setCommentSettings((prevSettings) => ({
                ...prevSettings,
                mediaInCommentsAllowed: !prevSettings.mediaInCommentsAllowed,
              }))
            }
          />
        </>}
        </div>
      </div>
    </div>
  );
}

export default Settings;
