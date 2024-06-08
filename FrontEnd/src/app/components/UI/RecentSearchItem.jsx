import React, { useState, useEffect } from "react";
import styles from "./RecentSearchItem.module.css";
import Image from "next/image";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import searchclose from "../../assets/searchclose.svg";
import apiHandler from "@/app/utils/apiHandler.js";
import getCookies from "@/app/utils/getCookies";
import { useRouter } from "next/navigation";

/**
 * Component representing an item in the recent search list
 * @component
 * @param {Object} props Component props
 * @param {string} props.title The title of the search item
 * @param {string} props.url The URL of the search item's icon
 * @param {string} props.type The type of the search item
 * @param {string} props.page The current page where the search item is displayed
 * @param {string} props.pageIn The page context where the search item is displayed
 * @param {string} props.route The route for navigating to the search item
 * @param {string} props.key The unique key for the item
 * @returns {JSX.Element} JSX element representing the recent search item
 *
 * @example
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 * <RecentSearchItem
 *   title="community1"
 *   url={awwpfp}
 *   type="community"
 *   page="home"
 *   pageIn="Spreadit"
 *   route="/community"
 *   key={1}
 * />
 */

function RecentSearchItem({ title, url, key, type, page, pageIn, route }) {
  const [token, setToken] = useState(null);
  const router = useRouter();

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

  const deletesearch = async (values) => {
    try {
      const queryString = `?query=${encodeURIComponent(values)}`;
      await apiHandler(
        `/search/history${queryString}`,
        "DELETE",
        { query: title },
        token,
      );
    } catch (error) {
      
    }
  };

  return (
    <div>
      <li key={key} className={`${styles.dropdown} $`}>
        {" "}
        <div
          className={styles.dropdownrow}
          onClick={
            pageIn === "Spreadit"
              ? type === "community"
                ? () => router.push(`/community/${title}`)
                : type === "user"
                  ? () => router.push(`/profile/${title}`)
                  : () => router.push(`/search?q=${title}`)
              : type === "community"
                ? () => router.push(`/community/${title}`)
                : type === "user"
                  ? () => router.push(`/profile/${title}`)
                  : () =>
                      router.push(
                        `${route}/${page.split("/")[1]}/search?q=${title}`,
                      )
          }
        >
          <div className={`${styles.icon} $`}>
            {type == "normal" ? (
              <AccessTimeOutlinedIcon className={`${styles.icon} $`} />
            ) : (
              <Image
                className={`${styles.icon} $`}
                src={url}
                alt="Profile icon"
                width={23}
                height={23}
                layout="fixed"
              />
            )}
          </div>
          <p className={styles.dropdowntitle}>
            {type == "community"
              ? "r/" + title
              : type == "user"
                ? "u/" + title
                : title}
          </p>

          <Image
            className={`${styles.close} $`}
            src={searchclose}
            alt="delete icon"
            width={20}
            height={20}
            layout="fixed"
            onClick={() => deletesearch(title)}
          />
        </div>
      </li>
    </div>
  );
}

export default RecentSearchItem;
