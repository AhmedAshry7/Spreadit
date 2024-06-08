"use client";
import React, { useState, useEffect } from "react";
import SettingItem from "../../components/UI/SettingItem.jsx";
import optionData from "../options.js";
import handler from "../../utils/apiHandler";
import SettingsLayout from "../SettingsLayout";
import getCookies from "@/app/utils/getCookies";

const API_URL = "/settings/feed";

/**
 * Component for rendering the Feed Settings page
 * @component
 * @returns {JSX.Element} The rendered Feed component
 *
 * @example
 * <Feed />
 */
function Feed() {
  const [token, setToken] = useState(null);
  const [nsfw, setNsfw] = useState(false); // Assuming default value is false
  const [blurNsfw, setBlurNsfw] = useState(false); // Assuming default value is false
  const [homeRecommend, setHomeRecommend] = useState(false); // Assuming default value is false
  const [autoplay, setAutoplay] = useState(false); // Assuming default value is false
  const [reduceAnim, setReduceAnim] = useState(false); // Assuming default value is false
  const [communityThemes, setCommunityThemes] = useState(false); // Assuming default value is false
  const [contentSort, setContentSort] = useState(); // Assuming default value is 1
  const [csRemember, setCSRemember] = useState(false); // Assuming default value is false
  const [globalView, setGlobalView] = useState(); // Assuming default value is 1
  const [gvRemember, setGVRemember] = useState(false); // Assuming default value is false
  const [newTab, setNewTab] = useState(false); // Assuming default value is false
  const [defMarkdown, setDefMarkdown] = useState(false); // Assuming default value is false
  const [loading, setLoading] = useState(true); // Loading indicator
  const [prevBlur, setPrevBlur] = useState(blurNsfw);
  const [contentSortFrontend, setContentSortFrontend] = useState(); // Assuming default value is 1
  const [globalViewFrontend, setGlobalViewFrontend] = useState(); // Assuming default value is 1

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
      setLoading(true);
      
      try {
        // Fetch user preferences
        const prefsData = await handler(API_URL, "GET", "", token);
        
        setNsfw(prefsData.adultContent);
        setBlurNsfw(prefsData.blurnsfw);
        setHomeRecommend(prefsData.homerecommend);
        setAutoplay(prefsData.autoplayMedia);
        setReduceAnim(prefsData.reduceanim);
        setCommunityThemes(prefsData.communityThemes);
        setContentSort(prefsData.communityContentSort);
        setCSRemember(prefsData.csremember);
        setGlobalView(prefsData.globalContentView);
        setGVRemember(prefsData.gvremember);
        setNewTab(prefsData.openPostsInNewTab);
        setDefMarkdown(prefsData.defmarkdown);
        setPrevBlur(prefsData.prevblur);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message, retry mechanism)
      } finally {
        setLoading(false); // Set loading state to false regardless of success or error
      }
    }
    fetchData();
  }, [token]);

  useEffect(() => {
    if (contentSort === "Hot") setContentSortFrontend(1);
    else if (contentSort === "New") setContentSortFrontend(2);
    else if (contentSort === "Top") setContentSortFrontend(3);
    else if (contentSort === "Rising") setContentSortFrontend(4);
  }, [contentSort]);

  useEffect(() => {
    if (globalView === "Card") setGlobalViewFrontend(1);
    else if (globalView === "Classic") setGlobalViewFrontend(2);
    else if (globalView === "Compact") setGlobalViewFrontend(3);
  }, [globalView]);

  /**
   * Function to update user preferences via API call
   */
  async function patchData() {
    let newPrefsData = {
      adultContent: nsfw,
      blurnsfw: blurNsfw,
      homerecommend: homeRecommend,
      autoplayMedia: autoplay,
      reduceanim: reduceAnim,
      communityThemes: communityThemes,
      communityContentSort: contentSort,
      csremember: csRemember,
      globalContentView: globalView,
      gvremember: gvRemember,
      openPostsInNewTab: newTab,
      defmarkdown: defMarkdown,
      prevblur: prevBlur,
    };
    
    try {
      // Fetch user preferences
      const prefsData = await handler(API_URL, "PUT", newPrefsData, token);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message, retry mechanism)
    }
  }

  useEffect(() => {
    if (!loading) patchData();
  }, [
    nsfw,
    blurNsfw,
    homeRecommend,
    autoplay,
    reduceAnim,
    communityThemes,
    contentSort,
    csRemember,
    globalView,
    gvRemember,
    newTab,
    defMarkdown,
  ]);

  // State to track locked components
  const [lockedComponents, setLockedComponents] = useState({});

  /**
   * Callback function to lock/unlock component.
   * @param {number} id       The ID of the component
   * @param {boolean} isLocked   Flag indicating whether the component is locked or not
   */
  const handleLockComponent = (id, isLocked) => {
    // Update locked components state based on ID and lock status
    setLockedComponents((prevLockedComponents) => ({
      ...prevLockedComponents,
      [id]: isLocked,
    }));
  };

  /**
   * General click handler for switch toggles
   * @param {number} id      The ID of the option
   * @param {boolean} status   The toggle status
   */
  const handleItemClick = (id, status) => {
    
    handleAPIput(id, status);
    if (id === 1 && status === false) {
      handleLockComponent(2, true);
      setBlurNsfw(false);
      
    } else if (id === 1 && status === true) {
      handleLockComponent(2, false);
      
    }
  };

  /**
   * Handles dropdown click event.
   * @param {number} id           The ID of the dropdown
   * @param {number} selectedId   The selected ID of the dropdown suboption
   */
  const handleDropdownClick = (id, selectedId) => {
    
    handleAPIput(id, selectedId);
  };

  /**
   * General handler for API PUT request for updating preferences (can be all types of input)
   * @param {number} id      Option ID
   * @param {boolean} status   Toggle status
   * @param {number} status   Selected option under a dropdown
   */
  const handleAPIput = (id, status) => {
    if (id === 1) setNsfw(status);
    else if (id === 2) {
      setBlurNsfw(status);
      // Store its previous state in case toggle id 1 is turned on again (which it depends on)
      setPrevBlur(status);
    } else if (id === 3) setHomeRecommend(status);
    else if (id === 4) setAutoplay(status);
    else if (id === 5) setReduceAnim(status);
    else if (id === 6) setCommunityThemes(status);
    else if (id === 7) {
      setContentSortFrontend(status);
      let sortType;
      if (status === 1) sortType = "Hot";
      else if (status === 2) sortType = "New";
      else if (status === 3) sortType = "Top";
      else if (status === 4) sortType = "Rising";
      setContentSort(sortType);
    } else if (id === 8) setCSRemember(status);
    else if (id === 9) {
      setGlobalViewFrontend(status);
      let viewType;
      if (status === 1) viewType = "Card";
      else if (status === 2) viewType = "Classic";
      else if (status === 3) viewType = "Compact";

      setGlobalView(viewType);
    } else if (id === 10) setGVRemember(status);
    else if (id === 11) setNewTab(status);
    else if (id === 12) setDefMarkdown(status);
  };

  useEffect(() => {
    if (!nsfw) {
      handleLockComponent(2, true);
      setBlurNsfw(false);
    } else {
      setBlurNsfw(prevBlur);
      handleLockComponent(2, false);
    }
  }, [nsfw]);

  if (loading) {
    return (
      <div className="window">
        <div className="setting--page">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  const initialStateArray = {
    1: nsfw,
    2: blurNsfw,
    3: homeRecommend,
    4: autoplay,
    5: reduceAnim,
    6: communityThemes,
    8: csRemember,
    10: gvRemember,
    11: newTab,
    12: defMarkdown,
  };

  const dropDownInitial = {
    7: contentSort,
    9: globalView,
  };

  return (
    <div className="window">
      <div className="settings--page">
        <SettingsLayout index={3} />
        <div className="settings--container">
          <div className="settings--content">
            <h2 className="settings--h2">Feed settings</h2>
            <h3 className="uppercase-h3-description">Content Preferences</h3>

            {optionData.map(
              (option) =>
                option.id < 12 && (
                  <SettingItem
                    key={option.id}
                    option={option}
                    onItemClick={handleItemClick}
                    dropDownClick={handleDropdownClick}
                    isLocked={lockedComponents[option.id]}
                    defaultDropdown={dropDownInitial[option.id]}
                    isToggled={initialStateArray[option.id]}
                    prevState={prevBlur}
                  />
                ),
            )}
            <h3 className="uppercase-h3-description">Post Preferences</h3>
            {optionData.map(
              (option) =>
                option.id === 12 && (
                  <SettingItem
                    key={option.id}
                    option={option}
                    onItemClick={handleItemClick}
                    isToggled={defMarkdown}
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;

/*


*/
