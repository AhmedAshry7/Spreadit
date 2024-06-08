import React, { useState, useEffect } from "react";
import styles from "./SearchItem.module.css";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import apiHandler from "@/app/utils/apiHandler.js";
import getCookies from "@/app/utils/getCookies";

/**
 * Component representing an item in the search results
 * @component
 * @param {Object} props Component props
 * @param {string} props.name The name of the search result item
 * @param {string} props.membersorkarmas The number of members or karma points associated with the item
 * @param {string} props.url The URL of the item's icon
 * @param {string} props.type The type of the item
 * @param {string} props.key The unique key for the item
 * @returns {JSX.Element} JSX element representing the search result item
 *
 * @example
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 * <SearchItem
 *   name="community1"
 *   membersorkarmas="100 members"
 *   url={awwpfp}
 *   type="community"
 *   key={1}
 * />
 */

function SearchItem({ name, membersorkarmas, url, type, key }) {
  const router = useRouter();
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

  const takeTo = async () => {
    try {
      if (token !== null) {
        await apiHandler(
          "/search/log",
          "POST",
          {
            query: name,
            type: type === "community" ? "community" : "user",
            communityName: type === "community" ? name : "",
            username: name,
            isInProfile: true,
          },
          token,
        );
      }
    } catch (error) {
      
    }
    router.push(`/${type === "people" ? "profile" : "community"}/${name}`);
  };

  return (
    <div>
      <li key={key} className={`${styles.dropdown} $`} onClick={takeTo}>
        {" "}
        <div className={styles.dropdownrow}>
          <div className={`${styles.icon} $`}>
            <Image
              className={`${styles.icon} $`}
              src={url}
              alt="profile icon"
              width={30}
              height={30}
              layout="fixed"
            />
          </div>

          <div className={styles.info}>
            {type == "community" ? (
              <p className={styles.name}>{"r/" + name}</p>
            ) : (
              <p className={styles.name}>{"u/" + name}</p>
            )}
            {type == "community" ? (
              <p className={styles.membersorkarmas}>
                {membersorkarmas + " members"}
              </p>
            ) : (
              <p className={styles.membersorkarmas}>
                {membersorkarmas + " karma"}
              </p>
            )}
          </div>
        </div>
      </li>
    </div>
  );
}

export default SearchItem;
