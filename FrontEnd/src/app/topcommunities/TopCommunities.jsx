"use client";
import React, { useState, useEffect } from "react";
import "./TopCommunities.css";
import ToolBar from "../components/UI/Toolbar";
import CommunityBoxItem from "../components/UI/CommunityBoxItem";
import awwpfp from "@/app/assets/blueProfile.jpeg";
import awwbanner from "@/app/assets/background.jpeg";
import Image from "next/image";
import getCookies from "../utils/getCookies";
import handler from "../utils/apiHandler";

/**
 * A component for displaying top communities
 * It showcases communities along with details such as member count, category, and a brief description.
 *
 * @component
 * @returns {JSX.Element} The TopCommunities component which lists top community boxes
 *
 * @example
 * <TopCommuniteies/>
 */

function TopCommunities() {
  const [communities, setCommunities] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const cookies = await getCookies();
      if (cookies === null || !cookies.access_token) {
        redirect("/login");
      }
      try {
        const response = await handler(
          "/community/top-communities",
          "GET",
          "",
          cookies.access_token,
        );
        
        setCommunities(response.communities);
      } catch (err) {
        
      }
    };
    fetchData();
  }, []);

  return (
    <div className="topcommunities">
      <ToolBar loggedin={true} page={"Spreadit"} />
      <div className="text-container">
        <p className="main-title">Best of Spreadit</p>
        <p className="secound-title">Top Communities</p>
        <p className="title-desc">Browse Spreadit's largest communities</p>{" "}
        <div className="comunity-container">
          <ul className="unorderd-list">
            {communities.map((val, key) => {
              return (
                <div>
                  <CommunityBoxItem
                    count={key + 1}
                    name={val.name}
                    icon={
                      <Image
                        className="icon"
                        src={awwpfp}
                        alt="Community Profile"
                      />
                    }
                    iconurl={awwpfp}
                    description={val.description}
                    category={val.category}
                    members={"1k"}
                    key={key}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopCommunities;
