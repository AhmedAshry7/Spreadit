import React, { useState, useRef, useEffect } from "react";
import DropdownCommunity from "./DropdownCommunity";
import styles from "./CreateDropdownMenu.module.css";
import CreateCommunityModal from "../components/UI/CreateCommunityModal";
import awwpfp from "@/app/assets/awwpfp.jpg";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

/**
 * Component for the dropdown menu in the post creation interface.
 * @component
 * @param {string} userName - The username displayed in the dropdown menu.
 * @param {string} userIcon - The URL of the user's avatar icon.
 * @returns {JSX.Element} The rendered CreateDropdownMenu component.
 *
 * @example
 * // Renders the CreateDropdownMenu component with specified props.
 * <CreateDropdownMenu userName="Testing" userIcon="https://example.com/avatar.jpg" />
 */

function CreateDropdownMenu({
  userName = "Testing",
  userIcon = "https://styles.redditmedia.com/t5_7r9ed6/styles/profileIcon_ljpm97v13fpc1.jpg",
  setCommunity,
  communities,
  searchedCommunities,
  isSearching = false,
}) {
  const router = useRouter();

  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  //const [username, setUsername] = useState("tester");
  //const [avatar, setAvatar] = useState(awwpfp);

  const handleRedirect = () => {
    // Redirect to the desired URL when the div is clicked
    window.location.href = "profile";
  };

  function CreateCommunity() {
    setShowCreateCommunityModal(true);
  }

  const CloseCreateCommunity = () => {
    setShowCreateCommunityModal(false);
  };

  return (
    <div
      className={`${styles.createDropdownMenu} ${styles.DropdownMenu}`}
      data-testid="dropdown-menu"
    >
      {showCreateCommunityModal && (
        <CreateCommunityModal close={() => CloseCreateCommunity()} />
      )}
      {isSearching && (
        <div className={`${styles.DropdownMenuSection}`}>
          <div
            className={`${styles.DropdownMenuCommunityHeader}`}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span className={`${styles.DropdownMenuCommunityHeaderText}`}>
              Searching...
            </span>
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
        </div>
      )}
      {searchedCommunities && searchedCommunities.length > 0 && (
        <div className={`${styles.DropdownMenuSection}`}>
          <div className={`${styles.DropdownMenuCommunityHeader}`}>
            <span className={`${styles.DropdownMenuCommunityHeaderText}`}>
              Search results
            </span>
          </div>
          {console.log(searchedCommunities) ??
            (searchedCommunities.length > 0 &&
              searchedCommunities.map((communityObj) => {
                return (
                  <DropdownCommunity
                    communityName={communityObj.name}
                    communityMembers={communityObj.membersCount}
                    communityIcon={communityObj.image}
                    setCommunity={setCommunity}
                  />
                );
              }))}
        </div>
      )}
      <div className={`${styles.DropdownMenuSection}`}>
        <div className={`${styles.userHeader}`}>Your profile</div>
        <div
          className={`${styles.menuCommunityContainer}`}
          onClick={() => {
            if (
              window.confirm(
                "You are leaving this page.\nAre you sure you want to go to your profile? Any unposted content will be lost!",
              )
            ) {
              router.push(`profile/${userName}`);
            }
          }}
        >
          <div className={`${styles.menuCommunity}`}>
            <div className={`${styles.userIconPosition}`}>
              <img
                alt="User avatar"
                className={`${styles.userIconRadius} ${styles.userIconIdent}
            ${styles.userIconBorder} ${styles.userIconSize}`}
                src={userIcon}
              />
            </div>
            <div className={`${styles.userNameFlex}`}>
              <span className={`${styles.userNameText}`}>u/{userName}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.DropdownMenuSection}`}>
        <div className={`${styles.DropdownMenuCommunityHeader}`}>
          <span className={`${styles.DropdownMenuCommunityHeaderText}`}>
            Your communities
          </span>
          <button
            role="button"
            tabIndex="0"
            className={`${styles.buttonCreateNew} ${styles.buttonCreateNewMargin}
            ${styles.buttonCreateNewText} ${styles.buttonCreateNewAlignment}`}
            onClick={CreateCommunity}
          >
            Create New
          </button>
        </div>
        {(communities && console.log(communities)) ??
          (communities.length > 0 &&
            communities.map((communityObj) => {
              return (
                <DropdownCommunity
                  communityName={communityObj.name}
                  communityMembers={communityObj.membersCount}
                  communityIcon={communityObj.image}
                  setCommunity={setCommunity}
                />
              );
            }))}
      </div>
    </div>
  );
}

export default CreateDropdownMenu;
