import React, { useState, useRef, useEffect } from "react";
import CreateDropdownMenu from "./CreateDropdownMenu";
import styles from "./CreateLeftDropdown.module.css";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";
import { useRouter } from "next/navigation";
import "./Create.css";

/**
 * Component for the dropdown menu in the left section of the post creation interface.
 * @component
 * @param {string} current - The current value of the search box.
 * @param {function} setter - A function to set the value of the search box or on selecting an option from dropwdpwn.
 * @returns {JSX.Element} The rendered CreateLeftDropdown component.
 *
 * @example
 * // Renders the CreateLeftDropdown component with specified current value and setter function.
 * <CreateLeftDropdown current="example" setter={setValue} />;
 */

export default function CreateLeftDropdown({
  current,
  setter,
  username,
  avatarUrl,
  communityIcon,
  found = false,
}) {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [searchedCommunities, setSearchedCommunities] = useState([]);
  const [token, setToken] = useState("");
  const dropdownRef = useRef(null);
  const [searchSuggestion, setSearchSuggestion] = useState({
    communities: [],
    users: [],
  });
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        router.push("/login");
      }

      // Fetch user subscribed communities
      setToken(cookies.access_token);
      const userData = await handler(
        `/user/profile-info/${cookies.username}`,
        "GET",
        "",
        cookies.access_token,
      );
      
      setCommunities(userData.subscribedCommunities);
    };
    fetchData();
  }, [menuVisible]);

  function handleInputChange(event) {
    const { value } = event.target;
    searchsuggestion(value);
    setter(value);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  const searchsuggestion = async (values) => {
    
    try {
      const queryString = `?q=${encodeURIComponent(values)}`;
      const suggestions = await handler(
        `/search/suggestions${queryString}`,
        "GET",
        null,
        token,
      );
      
      setSearchSuggestion(suggestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchedCommunities = searchSuggestion.communities;
      const transformedCommunities = fetchedCommunities.map((communityObj) => ({
        _id: [communityObj.communityId],
        name: [communityObj.communityName],
        image: [communityObj.communityProfilePic],
        membersCount: [communityObj.membersCount],
      }));
      setSearchedCommunities(transformedCommunities);
      setIsSearching(false);
    }, 0);

    return () => clearTimeout(delay);
  }, [searchSuggestion]);

  useEffect(() => {
    if (current === "" || found) {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  }, [current, found]);

  return (
    <div
      className={`${styles.createLeftFlexDropdownFlexContainer} ${styles.createLeftFlexGroupedOptions}`}
    >
      <div
        className={`${styles.createDropdownArea} ${menuVisible ? styles.boxShadow : ""}`}
        ref={dropdownRef}
      >
        <div className={styles.createDropdownFlex}>
          {found ? (
            <img
              className={`${styles.createDropdownOptionIcon}`}
              src={`${communityIcon}`}
              style={{ verticalAlign: "middle", borderRadius: "100%" }}
            />
          ) : (
            <span
              className={`${!menuVisible ? styles.createCommunityIcon : ""} ${styles.createDropdownOptionIcon}`}
            >
              {menuVisible && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{ fill: "#878a8c", width: "20px", height: "20px" }}
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              )}
            </span>
          )}
          <div className={styles.createDropdownOptionFlex}>
            <input
              className={styles.createDropdownOptionText}
              placeholder={
                menuVisible ? "Search communities" : "Choose a community"
              }
              type="text"
              spellCheck="false"
              onChange={handleInputChange}
              value={current}
              onClick={toggleMenu} // Toggle menu on input click
            />
          </div>
          <span className={`${styles.icon}`} onClick={toggleMenu}>
            <svg
              className={`${styles.dropdownArrowColor}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
            </svg>
          </span>
        </div>
        {menuVisible && communities && (
          <CreateDropdownMenu
            isSearching={isSearching}
            searchedCommunities={searchedCommunities}
            communities={communities}
            userName={username}
            userIcon={avatarUrl}
            setCommunity={setter}
          />
        )}
      </div>
    </div>
  );
}
