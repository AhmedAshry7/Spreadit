import React, { useState, useEffect } from "react";
import styles from "./ModCommunityRightSidebar.module.css";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import EditCommunityModal from "./EditCommunityModal";
import CommunityAppearancePopup from "./CommunityAppearancePopup";
import { useRouter } from "next/navigation";
import RulesRightSidebarItem from "./RulesRightSidebarItem";
import ModeratorsItem from "./ModeratorsItem";
import ProfileIcon from "./ProfileIcon.jsx";

/**
 * Component representing the right sidebar for moderators in a community
 * @component
 * @param {Object} props Component props
 * @param {string} props.communityName The name of the community
 * @param {Object} props.communityData Data about the community
 * @param {Array<Object>} props.moderators Array of moderator objects
 * @returns {JSX.Element} JSX element representing the right sidebar for moderators in a community
 *
 * @example
 * let awwpfp= "@/app/assets/awwpfp.jpg";
 * <ModCommunityRightSidebar
 *   communityName="Community"
 *   communityData={{
 *     description: "community description",
 *     membersCount: 100,
 *     rules: [{ title: "rule 1", description: "description of Rule 1" }]
 *   }}
 *   moderators={[{ username: "moderator1", avatar: {awwpfp} }]}
 * />
 */

function ModCommunityRightSidebar({
  communityName,
  communityData,
  moderators,
}) {
  const router = useRouter();
  const [showEditCommunityModal, setShowEditCommunityModal] = useState(false);
  const [showCommunityAppearancePopup, setShowCommunityAppearancePopup] =
    useState(false);

  function EditCommunity() {
    setShowEditCommunityModal(true);
  }

  function openCommunityAppearancePopup() {
    setShowCommunityAppearancePopup(true);
  }

  const CloseEditCommunity = () => {
    setShowEditCommunityModal(false);
  };

  const closeCommunityAppearancePopup = () => {
    setShowCommunityAppearancePopup(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.communityname}>
        <h1 className={styles.communitytype}>{communityName}</h1>
        <ModeEditOutlineTwoToneIcon
          className={styles.editbutton}
          onClick={() => EditCommunity()}
        />
      </div>
      <p className={styles.description}>{communityData.description}</p>

      <div className={styles.communityinfo}>
        <div className={styles.communityinfo1}>
          <h1 className={styles.nums}>{communityData.membersCount}</h1>
          <p className={styles.numstitle}>{"Members"}</p>
        </div>
      </div>

      <p className={styles.spliter}>_______________________________________</p>

      <div className={styles.communityname}>
        <h1 className={styles.sidebartitles}>RULES</h1>
        <ModeEditOutlineTwoToneIcon
          className={styles.ruleeditbutton}
          onClick={() =>
            router.push(
              `/community/${communityName}/moderation/rulesandremoval`,
            )
          }
        />
      </div>
      <br></br>
      <div>
        <ol className={styles.sidebarlist}>
          {communityData.rules.map((val, key) => {
            return (
              <div className={`${styles.dropdownmenu} $`}>
                <RulesRightSidebarItem
                  title={val.title}
                  description={val.description}
                  key={key}
                  count={key + 1}
                />
              </div>
            );
          })}
        </ol>
      </div>

      <p className={styles.spliter}>_______________________________________</p>

      <h1 className={styles.sidebartitles}>MODERATORS</h1>
      <br></br>

      <ul className={styles.sidebarlist}>
        {moderators.map((val, key) => (
          <li key={key}>
            <ModeratorsItem
              title={val.username}
              icon={<ProfileIcon url={val.avatar} />}
            />
          </li>
        ))}
      </ul>

      <button className={styles.bookmarksbuttons}>Message the mods</button>

      <p className={styles.spliter}>_______________________________________</p>

      <div className={styles.communityname}>
        <h1 className={styles.sidebartitles}>COMMUNITY SETTINGS</h1>
        <ModeEditOutlineTwoToneIcon
          className={styles.editbutton}
          onClick={openCommunityAppearancePopup}
        />
      </div>
      <p className={styles.description}>Community Appearance</p>

      <br></br>
      <br></br>
      <br></br>

      {showEditCommunityModal && (
        <EditCommunityModal
          close={() => CloseEditCommunity()}
          communityName={communityName}
          communityData={communityData}
        />
      )}

      {showCommunityAppearancePopup && (
        <CommunityAppearancePopup
          onClose={closeCommunityAppearancePopup}
          avatar={communityData.image}
          communityBanner={communityData.communityBanner}
          communityName={communityName}
          communityData={communityData}
        />
      )}
    </div>
  );
}

export default ModCommunityRightSidebar;
