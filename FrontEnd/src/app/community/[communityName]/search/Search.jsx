import React, { useState, useEffect } from "react";
import "./Search.css";
import awwpfp from "@/app/assets/awwpfp.jpg";
import PostsItem from "./PostsItem";
import CommentsItem from "./CommentsItem";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import relevance from "@/app/assets/relevance.svg";
import hot from "@/app/assets/hot.svg";
import top from "@/app/assets/top.svg";
import newsort from "@/app/assets/new.svg";
import mostcomments from "@/app/assets/mostcomments.svg";
import searchallarrow from "@/app/assets/searchallarrow.svg";
import getCookies from "@/app/utils/getCookies";
import handler from "@/app/utils/apiHandler";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

/**
 * Component for displaying search results of posts and comments
 * @component
 * @returns {JSX.Element} JSX element for the search results
 *
 * @example
 * <Search />
 */

function Search() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [searchData, setSearchData] = useState({
    results: [{ content: "", attachments: [{ links: "" }] }],
  });
  const [inPage, setInPage] = useState("posts");
  const [sortIconPost, setSortIconPost] = useState(relevance);
  const [sortIconComment, setSortIconComment] = useState(relevance);
  const [sortNamePost, setSortNamePost] = useState("Relevance");
  const [sortNameComment, setSortNameComment] = useState("Relevance");
  const [isDropdownedPost, setIsDropdownedPost] = useState(false);
  const [isDropdownedComment, setIsDropdownedComment] = useState(false);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const name = searchParams.get("name");

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

  useEffect(() => {
    async function getSearch() {
      try {
        
        const search = await handler(
          `/search/profile?username=${""}&communityname=${name}&q=${query}&type=${inPage}&sort=${inPage === "posts" ? sortNamePost.toLowerCase() : inPage === "comments" ? sortNameComment.toLowerCase() : ""}`,
          "GET",
          "",
          token,
        );
        setSearchData(search);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getSearch();
  }, [token, inPage, sortNamePost, sortNameComment]);

  const handleSortPost = (option) => {
    setSortNamePost(option);
    setIsDropdownedPost(false);
    if (option == "Relevance") {
      setSortIconPost(relevance);
    } else if (option == "New") {
      setSortIconPost(newsort);
    } else if (option == "Hot") {
      setSortIconPost(hot);
    } else if (option == "Most Comments") {
      setSortIconPost(mostcomments);
    } else if (option == "Top") {
      setSortIconPost(top);
    }
  };

  const handleSortComment = (option) => {
    setSortNameComment(option);
    setIsDropdownedComment(false);
    if (option == "Relevance") {
      setSortIconComment(relevance);
    } else if (option == "New") {
      setSortIconComment(newsort);
    } else if (option == "Top") {
      setSortIconComment(top);
    }
  };

  return (
    <div className="rulesandremoval">
      <div className="switchbuttons">
        <div className="title">SEARCH RESULTS</div>
        <button
          className={inPage === "posts" ? "buttons1clicked" : "buttons1"}
          onClick={() => setInPage("posts")}
        >
          Posts
        </button>
        <button
          className={inPage === "comments" ? "buttons3clicked" : "buttons3"}
          onClick={() => setInPage("comments")}
        >
          Comments
        </button>
      </div>

      <div className="content">
        {inPage === "posts" ? (
          <div className="sort">
            <p className="sorttitle">Sort by: </p>
            <div
              className="sorttype"
              onClick={() => setIsDropdownedPost(!isDropdownedPost)}
            >
              <Image
                className="sorticon"
                src={sortIconPost}
                alt="profile icon"
                width={15}
                height={15}
                layout="fixed"
              />
              <p className="sortname">{sortNamePost}</p>
              {isDropdownedPost ? (
                <KeyboardArrowUpOutlinedIcon className="arrowbutton" />
              ) : (
                <KeyboardArrowDownIcon className="arrowbutton" />
              )}
              {isDropdownedPost && (
                <div className="dropdownsort">
                  <ul>
                    <li onClick={() => handleSortPost("Relevance")}>
                      {" "}
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={relevance}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        Relevance
                      </div>
                    </li>
                    <li onClick={() => handleSortPost("Hot")}>
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={hot}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        Hot
                      </div>
                    </li>
                    <li onClick={() => handleSortPost("Top")}>
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={top}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        Top
                      </div>
                    </li>
                    <li onClick={() => handleSortPost("New")}>
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={newsort}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        New
                      </div>
                    </li>
                    <li onClick={() => handleSortPost("Most Comments")}>
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={mostcomments}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        Most Comments
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p className="linespliter">
              _____________________________________________________________________________________________________________________________________
            </p>
          </div>
        ) : inPage === "comments" ? (
          <div className="sort">
            <p className="sorttitle">Sort by: </p>
            <div
              className="sorttype"
              onClick={() => setIsDropdownedComment(!isDropdownedComment)}
            >
              <Image
                className="sorticon"
                src={sortIconComment}
                alt="profile icon"
                width={15}
                height={15}
                layout="fixed"
              />
              <p className="sortname">{sortNameComment}</p>
              {isDropdownedComment ? (
                <KeyboardArrowUpOutlinedIcon className="arrowbutton" />
              ) : (
                <KeyboardArrowDownIcon className="arrowbutton" />
              )}
              {isDropdownedComment && (
                <div className="dropdownsort">
                  <ul>
                    <li onClick={() => handleSortComment("Relevance")}>
                      {" "}
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={relevance}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        Relevance
                      </div>
                    </li>
                    <li onClick={() => handleSortComment("Top")}>
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={top}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        Top
                      </div>
                    </li>
                    <li onClick={() => handleSortComment("New")}>
                      <div>
                        {" "}
                        <Image
                          className="sorticondropdown"
                          src={newsort}
                          alt="profile icon"
                          width={18}
                          height={18}
                          layout="fixed"
                        />
                        New
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <p className="linespliter">
              _____________________________________________________________________________________________________________________________________
            </p>
          </div>
        ) : (
          <hr></hr>
        )}

        <div className="allsearch">
          Show results from
          <p
            className="searchalllink"
            onClick={() => router.push(`/search?q=${query}`)}
          >
            {" "}
            all of Spreadit
          </p>
          <Image
            className="searchallarrow"
            src={searchallarrow}
            alt="search all arrow"
            width={10}
            height={10}
            layout="fixed"
          />
        </div>

        {inPage === "posts" ? (
          <ul className="contentbox">
            {searchData.results.map((val, key) => {
              return (
                <div>
                  <PostsItem
                    name={val.communityname}
                    title={val.title}
                    members={val.membersCount}
                    content={val.content}
                    comments={val.commentsCount}
                    votes={val.votesCount}
                    image={val.attachments.links ? val.attachments.links : ""}
                    description={val.CommunityDescription}
                    url={val.communityProfilePic}
                    banner={val.communityBanner}
                  />
                  <hr className="spliter"></hr>
                </div>
              );
            })}
          </ul>
        ) : inPage === "comments" ? (
          <ul className="contentbox">
            {searchData.results.map((val, key) => {
              return (
                <div>
                  <CommentsItem
                    nameone={val.communityName}
                    nametwo={val.username}
                    commentoncomment={val.commentContent}
                    comment={val.postTitle}
                    urlone={val.communityProfilePic}
                    urltwo={val.userProfilePic}
                    commentvotes={val.commentVotes}
                    commentoncommentvotes={val.postVotes}
                    coccomment={val.postCommentsCount}
                    communitybanner={val.communitybanner}
                    description={val.description}
                  />
                  <hr className="spliter"></hr>
                </div>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Search;
