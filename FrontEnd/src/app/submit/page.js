"use client";
import SettingItem from "../components/UI/SettingItem.jsx";
import CreateLeftHeader from "./CreateLeftHeader.jsx";
import CreateLeftDropdown from "./CreateLeftDropdown.jsx";
import CreateRightRules from "./CreateRightRules.jsx";
import CreateLeftBox from "./CreateLeftBox.jsx";
import React, { useState, useEffect } from "react";
import Toolbar from "../components/UI/Toolbar.jsx";
import handler from "@/app/utils/apiHandler.js";
import CommunityInfoBox from "./CommunityInfoBox.jsx";
import CommunityRulesBox from "./CommunityRulesBox.jsx";
import getCookies from "../utils/getCookies.js";
import { useRouter } from "next/navigation.js";

import awwpfp from "@/app/assets/awwpfp.jpg";
import awwbanner from "@/app/assets/awwbanner.jpeg";
import { cookies } from "next/headers.js";

/**
 * Component for submitting content to a community.
 * @component
 * @param   {string} [currentCommunity=""]   The name of the current community if you were inside a community when creating
 * @returns {JSX.Element} The rendered Submit component.
 *
 * @example
 * // Renders the Submit component with default props (from home page for example)
 * <Submit />;
 * @example
 * // Renders the Submit component with a specified currentCommunity (while you were in community)
 * <Submit currentCommunity="ExampleCommunity" />;
 */
function Submit({ currentCommunity = "" }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [community, setCommunity] = useState(currentCommunity);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [url, setUrl] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const [notify, setNotify] = useState(true);
  const [voteOptions, setVoteOptions] = useState([
    { option: "", votes: 0 },
    { option: "", votes: 0 },
  ]);
  const [voteLength, setVoteLength] = useState(1);
  const [mediaArray, setMediaArray] = useState([]);
  const [postMediaArray, setPostMediaArray] = useState([]);
  const [realVoteOptions, setRealVoteOptions] = useState([]);
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [isCommunityFound, setIsCommunityFound] = useState(false);
  const [ready, setReady] = useState(false);
  const [pollReady, setPollReady] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [urlReady, setUrlReady] = useState(false);
  const [selectedOption, setSelectedOption] = useState("post");
  const [communityRules, setCommunityRules] = useState([]);
  const [communityMembers, setCommunityMembers] = useState(0);
  const [communityDescription, setCommunityDescription] =
    useState("Empty Description");
  const [communityDate, setCommunityDate] = useState("Empty Date");
  const [communityBanner, setCommunityBanner] = useState(awwbanner);
  const [communityIcon, setCommunityIcon] = useState(awwpfp);
  const [communityType, setCommunityType] = useState("Public");
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduled, setScheduled] = useState(true);
  const [communityPolls, setCommunityPolls] = useState(true);
  const [communitySpoiler, setCommunitySpoiler] = useState(true);
  const [communityNsfw, setCommunityNsfw] = useState(true);
  const [communityPosts, setCommunityPosts] = useState(true);
  const [communityLinks, setCommunityLinks] = useState(true);
  const [communityMedia, setCommunityMedia] = useState(true);
  const [multipleImages, setMultipleImages] = useState(true);
  const [postTypes, setPostTypes] = useState("any");

  const [loading, setLoading] = useState(true);

  const DEBOUNCE_DELAY = 1500;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "Are you sure you want to leave this page? Any unposted content will be lost!";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const cookies = await getCookies();
        if (cookies !== null && cookies.access_token && cookies.username) {
          setToken(cookies.access_token);
          setUsername(cookies.username);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }

    fetchData();
  }, []);

  async function fetchCommunity() {
    try {
      // Fetch user preferences
      if (community !== "") {
        const prefsData = await handler(
          `/community/${community}/get-info`,
          "GET",
          "",
          token,
        );
        setIsCommunityFound(true);
        setCommunityRules(prefsData.rules);
        setCommunityMembers(prefsData.membersCount);
        setCommunityDescription(prefsData.description);
        setCommunityDate(prefsData.dateCreated);
        setCommunityBanner(prefsData.communityBanner);
        setCommunityIcon(prefsData.image);
        setCommunityType(prefsData.communityType);
        setCommunityPolls(prefsData.settings.pollsAllowed);
        setCommunitySpoiler(prefsData.settings.spoilerEnabled);
        setCommunityNsfw(prefsData.allowNsfw);
        setPostTypes(prefsData.settings.postTypeOptions);
        setMultipleImages(prefsData.settings.multipleImagesPerPostAllowed);
        
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsCommunityFound(false);
      // Handle error (e.g., show error message, retry mechanism)
    } finally {
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCommunity();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [token]);

  useEffect(() => {
    setIsCommunityFound(false);
    const delay = setTimeout(() => {
      fetchCommunity();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [community]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        // Fetch user preferences
        const prefsData = await handler("/settings/profile", "GET", "", token);
        
        setAvatarUrl(prefsData.avatar);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message, retry mechanism)
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }
    fetchData();
  }, [token, username]);

  useEffect(() => {
    if (scheduled === true) {
      setScheduled(false);
    }
    const delay = setTimeout(() => {
      checkMod();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(delay);
  }, [community]);

  async function checkMod() {
    try {
      if (community !== "") {
        // Fetch moderators
        const isMod = await handler(
          `/community/moderation/${community}/${username}/is-moderator`,
          "GET",
          "",
          token,
        );

        if (isMod.isModerator) {
          setScheduled(true);
        } else {
          setScheduled(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setScheduled(false);
    } finally {
    }
  }

  useEffect(() => {
    if (
      community !== "" &&
      title !== "" &&
      pollReady &&
      mediaReady &&
      urlReady &&
      isCommunityFound &&
      selectedOption !== "null"
    )
      setReady(true);
    else setReady(false);
  }, [community, title, pollReady, mediaReady, urlReady, isCommunityFound]);

  useEffect(() => {
    if (selectedOption === "link" && url === "") setUrlReady(false);
    else setUrlReady(true);
  }, [selectedOption, url]);

  useEffect(() => {
    if (selectedOption === "poll" && communityPolls === false)
      setSelectedOption("null");
  }, [communityPolls, setCommunityPolls]);

  useEffect(() => {
    if (selectedOption === "link" && communityLinks === false)
      setSelectedOption("null");
  }, [communityLinks, setCommunityLinks]);

  useEffect(() => {
    if (selectedOption === "post" && communityPosts === false)
      setSelectedOption("null");
  }, [communityPosts, setCommunityPosts]);

  useEffect(() => {
    if (selectedOption === "image" && communityMedia === false)
      setSelectedOption("null");
  }, [communityMedia, setCommunityMedia]);

  useEffect(() => {
    if (!isCommunityFound) {
      setCommunityPolls(true);
      setCommunitySpoiler(true);
      setCommunityNsfw(true);
      setPostTypes("any");
      setMultipleImages(true);
      setCommunityMedia(true);
    }
  }, [community]);

  /*useEffect(() => {
    console.log(`multi: ${multipleImages}`)
    if (!multipleImages) {
      setPostMediaArray(prevPostMediaArray => {
        if (prevPostMediaArray.length !== 0) {
          return [prevPostMediaArray[0]];
        }
        return prevPostMediaArray;
      });
  
      setMediaArray(prevMediaArray => {
        if (prevMediaArray.length !== 0) {
          return [prevMediaArray[0]];
        }
        return prevMediaArray;
      });
    }
  }, [multipleImages, mediaReady, setMultipleImages]);*/

  useEffect(() => {
    if (communitySpoiler === false) setSpoiler(false);
  }, [communitySpoiler]);

  useEffect(() => {
    if (communityNsfw === false) setNsfw(false);
  }, [communityNsfw]);

  useEffect(() => {
    
    if (postTypes === "any") {
      setCommunityLinks(true);
      setCommunityPosts(true);
      setCommunityMedia(true);
    } else if (postTypes === "links only") {
      setCommunityLinks(true);
      setCommunityPosts(false);
      setCommunityMedia(false);
    } else if (postTypes === "text posts only") {
      setCommunityLinks(false);
      setCommunityPosts(true);
      setCommunityMedia(false);
    }
  }, [postTypes, setPostTypes]);

  useEffect(() => {
    
  }, [scheduledDate]);

  useEffect(() => {
    if (selectedOption === "image" && mediaArray.length === 0)
      setMediaReady(false);
    else setMediaReady(true);
  }, [selectedOption, mediaArray]);

  useEffect(() => {
    if (selectedOption === "poll" && !isPollEnabled) setPollReady(false);
    else setPollReady(true);
  }, [selectedOption, isPollEnabled]);

  useEffect(() => {
    setIsPollEnabled(realVoteOptions.length > 1 && selectedOption === "poll");
  }, [realVoteOptions, selectedOption]);

  useEffect(() => {
    // Filter out empty placeholder options
    const filteredOptions = voteOptions.filter(
      (item) => item.option.trim() !== "",
    );
    setRealVoteOptions(filteredOptions);
  }, [voteOptions]);

  if (loading) {
    return (
      <div className="window">
        <div className="setting--page">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  async function createPost() {
    try {
      const formData = new FormData();
      formData.append(`title`, title);
      formData.append(`community`, community);
      formData.append(`sendPostReplyNotification`, notify);
      if (communityNsfw) formData.append(`isNsfw`, nsfw);
      if (communitySpoiler) formData.append(`isSpoiler`, spoiler);
      if (scheduled && scheduledDate && scheduledDate !== "") {
        const dateObject = new Date(scheduledDate);
        const formattedDate = dateObject
          .toISOString()
          .slice(0, 16)
          .replace("T", " ");
        formData.append(`scheduledDate`, formattedDate);
      }
      
      const containsVideo =
        mediaArray.length > 0 ? mediaArray[0].type.includes("video") : false;
      if (selectedOption === "post") {
        if (communityMedia && postMediaArray.length > 0) {
          if (multipleImages)
            postMediaArray.forEach((file, index) => {
              formData.append(`attachments`, file);
            });
          else formData.append(`attachments`, postMediaArray[0]);
        }
      } else if (communityMedia && selectedOption === "image") {
        if (mediaArray.length > 0) {
          if (multipleImages)
            mediaArray.forEach((file, index) => {
              formData.append(`attachments`, file);
            });
          else formData.append(`attachments`, mediaArray[0]);
        }
      }
      if (selectedOption === "post") {
        formData.append(`content`, content);
        formData.append(`type`, "Post");
      } else if (selectedOption === "image") {
        formData.append(`type`, "Images & Video");
        formData.append(`fileType`, containsVideo ? `video` : `image`);
      } else if (selectedOption === "link") {
        formData.append(`type`, "Link");
        formData.append(`link`, url);
      } else if (selectedOption === "poll") {
        formData.append(`type`, "Poll");
        formData.append(`pollVotingLength`, `${voteLength} Days`);
        formData.append(`pollOptions`, JSON.stringify(realVoteOptions));
        formData.append(`content`, content);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}\n${response.statusText}`);

    }
    const responseData = await response.json();
    console.log('New Post added:', responseData);
    window.alert(`${responseData.message}`);
    

    } catch (error) {
      console.error("Error creating post:", error);
      window.alert(`${error}`);
    }
  }

  
  return (
    <div className="create">
      <header>
        <Toolbar loggedin={true} />
      </header>
      <main style={{ marginTop: "30px", paddingBottom: "30px" }}>
        <div className="createMainFlex">
          <div className="createLeftFlex">
            <CreateLeftHeader />
            <CreateLeftDropdown
              username={username}
              avatarUrl={avatarUrl}
              setter={setCommunity}
              current={community}
              found={isCommunityFound}
              communityIcon={communityIcon}
            />
            <CreateLeftBox
              mediaAllowed={communityMedia}
              multipleImages={multipleImages}
              linksAllowed={communityLinks}
              postsAllowed={communityPosts}
              nsfwAllowed={communityNsfw}
              spoilerAllowed={communitySpoiler}
              pollsAllowed={communityPolls}
              setTitle={setTitle}
              title={title}
              url={url}
              setUrl={setUrl}
              setNsfw={setNsfw}
              nsfw={nsfw}
              spoiler={spoiler}
              setSpoiler={setSpoiler}
              notify={notify}
              setNotify={setNotify}
              length={voteLength}
              setLength={setVoteLength}
              options={voteOptions}
              setOptions={setVoteOptions}
              mediaArray={mediaArray}
              setMediaArray={setMediaArray}
              postMediaArray={postMediaArray}
              setPostMediaArray={setPostMediaArray}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              ready={ready}
              content={content}
              setContent={setContent}
              createPost={createPost}
              setScheduledDate={setScheduledDate}
              scheduled={scheduled}
              scheduledDate={scheduledDate}
            />
          </div>
          <div className="createRightFlex">
            <div className="createRightFlexPadding">
              {isCommunityFound && (
                <>
                  <CommunityInfoBox
                    title={community}
                    description={communityDescription}
                    iconurl={communityIcon}
                    bannerurl={communityBanner}
                    membercount={communityMembers}
                    datecreated={communityDate}
                  />
                  <CommunityRulesBox
                    rules={communityRules}
                    community={community}
                  />
                </>
              )}
              <CreateRightRules />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Submit;
