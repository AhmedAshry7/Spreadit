import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "@/app/assets/post-images/mod-icons/search.svg";
import Image from "next/image";

/**
 * Component Used to display no results in search
 * @component
 * @param {function} setIsSearch The function to set the search visibility
 * @param {string} username The username to search for
 * @param {function} setKeyword The function to set the keyword to search for
 * @param {function} setValue The function to set the value of the search input
 * @returns {JSX.Element} The rendered NoResult component.
 *
 * @example
 * <NoResults setIsSearch={setIsSearch} username={username} setKeyword={setKeyword} setValue={setValue}/>
 */

function NoResults({ setIsSearch, username, setKeyword, setValue }) {
  function handleSeeAll() {
    setIsSearch(false);
    setKeyword("");
    setValue("");
  }

  return (
    <div className={styles.noresult_container}>
      <Image src={searchIcon} width={30} height={30} />
      <div className={styles.noresult_text}>No results for {username}</div>
      <button onClick={handleSeeAll} className={styles.noresult_btn}>
        See all
      </button>
    </div>
  );
}
export default NoResults;
