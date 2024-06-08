import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "@/app/assets/post-images/mod-icons/search.svg";
import NoResults from "./NoResults";
import Image from "next/image";
import { set } from "date-fns";

/**
 * Search bar component in user management pages
 * @component
 * @param {Boolean} isSearch Whether the search is active or not
 * @param {function} setIsSearch The function to set the search visibility
 * @param {function} setKeyword The function to set the keyword to search for
 * @param {Boolean} isEmpty Whether the search result is empty or not
 * @returns {JSX.Element} The rendered SearchBar component.
 *
 * @example
 * <SearchBar isSearch={isSearch}
 *  setIsSearch={setIsSearch}
 *  setKeyword={setKeyword}
 *  isEmpty={searchArray.length === 0}/>
 */

function SearchBar({ isSearch, setIsSearch, setKeyword, isEmpty }) {
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");

  function handleSeeAll() {
    setIsSearch(false);
    setKeyword("");
    setValue("");
  }

  function sendKeyword() {
    setUsername(value);
    setIsSearch(true);
    setKeyword(value);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <>
      <div className={styles.search_container}>
        <div className={styles.container}>
          <input
            value={value}
            onChange={handleChange}
            className={styles.input}
            type="text"
            placeholder="Search users"
          />
          <button
            data-testid="searchbtn"
            onClick={sendKeyword}
            className={styles.btn}
          >
            <Image width={16} height={16} src={searchIcon} />
          </button>
        </div>
        {isSearch ? (
          <button onClick={handleSeeAll} className={styles.noresult_btn}>
            See all
          </button>
        ) : null}
      </div>
      {isSearch && isEmpty ? (
        <NoResults
          setIsSearch={setIsSearch}
          username={username}
          setKeyword={setKeyword}
          setValue={setValue}
        />
      ) : null}
    </>
  );
}

export default SearchBar;
