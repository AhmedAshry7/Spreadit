import React, { useState, useEffect } from "react";
import styles from "./CreateCommunityModal.module.css";
import Toogle from "./Switch";
import LanguageIcon from "@mui/icons-material/Language";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EighteenUpRatingOutlinedIcon from "@mui/icons-material/EighteenUpRatingOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import apiHandler from "@/app/utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

/**
 * A modal component for creating a new community. It allows users to specify
 * the name, privacy type, and age restriction of the community.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.close Function to close the modal
 * @returns {JSX.Element} The JSX code for the create community modal
 *
 * @example
 *
 * const handleclose = () => {
 *  console.log("close")
 *  };
 * <CreateCommunityModal close={handleClose} />
 */

function CreateCommunityModal(props) {
  const router = useRouter();
  const [nameTaken, setNameTaken] = useState(false);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    public: true,
    restricted: false,
    private: false,
    mature: false,
  });

  function handleInputChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, name: value }));

    if (!formData.name) {
      setErrors("Please fill out this field.");
    } else if (formData.name.length < 3) {
      setErrors("Please lengthen this text to 3 characters or more");
    } else if (nameTaken) {
      setErrors("This name is already taken");
    } else {
      setErrors("");
    }
  }

  const handleclose = () => {
    props.close();
  };

  async function handleCreate() {
    const cookies = await getCookies();
    if (cookies === null) {
      redirect("/login");
    }
    const token = cookies.access_token;
    const communityName = formData.name;
    const isNSFW = formData.mature;
    let communityType;
    if (formData.public) {
      communityType = "Public";
    } else if (formData.private) {
      communityType = "Private";
    } else {
      communityType = "Restricted";
    }
    
    const response = await apiHandler(
      "/community/create",
      "POST",
      {
        name: communityName,
        is18plus: isNSFW ? "true" : "false",
        communityType: communityType,
      },
      token,
    );
    
    router.push(`/community/${communityName}`);
  }

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Create a community</h1>
          <div className={styles.closebutton} onClick={handleclose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <p className={styles.titledesc}>
          Build and grow a community about something you care about. We'll help
          you set things up.
        </p>
        <input
          className={styles.namebox}
          type="text"
          placeholder=" Name"
          value={formData.name}
          onChange={handleInputChange}
        ></input>
        {errors ? (
          <p className={styles.errorstext}>{errors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            Choose wisely. Once you pick a name, it can't be changed.
          </p>
        )}

        <br></br>

        <h2 className={styles.typestitle}>Type</h2>

        <div className={styles.typestitlebox}>
          <LanguageIcon />
          <div className={styles.typestitletexts}>
            <p className={styles.types}>Public</p>
            <p className={styles.typesdesc}>
              Anyone can view, post, and comment to this community
            </p>
          </div>
          <input
            type="radio"
            value={formData.public}
            className={styles.typestitlebutton}
            checked={formData.public}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                public: !formData.public,
                restricted: false,
                private: false,
              }))
            }
            name="radio"
          ></input>
        </div>
        <div className={styles.typestitlebox}>
          <VisibilityOutlinedIcon />
          <div className={styles.typestitletexts}>
            <p className={styles.types}>Restricted</p>
            <p className={styles.typesdesc}>
              Anyone can view, but only approved users can contribute
            </p>
          </div>
          <input
            type="radio"
            value={formData.restricted}
            className={styles.typestitlebutton}
            name="radio"
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                restricted: !formData.restricted,
                private: false,
                public: false,
              }))
            }
          ></input>
        </div>
        <div className={styles.typestitlebox}>
          <LockOutlinedIcon />
          <div className={styles.typestitletexts}>
            <p className={styles.types}>Private</p>
            <p className={styles.typesdesc}>
              Only approved users can view and submit to this community
            </p>
          </div>
          <input
            type="radio"
            value={formData.private}
            className={styles.typestitlebutton}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                private: !formData.private,
                restricted: false,
                public: false,
              }))
            }
            name="radio"
          ></input>
        </div>

        <p className={styles.spliter}>
          _____________________________________________________
        </p>

        <div className={styles.typestitlebox}>
          <EighteenUpRatingOutlinedIcon />
          <div className={styles.typestitletexts}>
            <p className={styles.types}>Mature (18+)</p>
            <p className={styles.typesdesc}>
              Must be over 18 to view and contribute
            </p>
          </div>
          <div className={styles.toogle}>
            <Toogle
              isToggled={formData.mature}
              onToggle={() =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  mature: !formData.mature,
                }))
              }
            />
          </div>
        </div>

        <div className={styles.buttonsbox}>
          <button className={styles.cancelbuttons} onClick={props.close}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            disabled={!(formData.name && !errors)}
            onClick={handleCreate}
          >
            Create your community
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCommunityModal;
