import React, { useState, useEffect } from "react";
import styles from "./RulesModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler.js";

/**
 * Component for displaying a modal to add a new rule
 * @component
 * @param {Object} props Component props
 * @param {Function} props.close Function to close the modal
 * @param {string} props.communityName Name of the community where the rule is being added
 * @returns {JSX.Element} JSX element for the rule modal
 *
 * @example
 * // Renders a rule modal for adding a new rule
 * <RulesModal close={console.log("Close modal")} communityName="aww" />
 */

function RulesModal({ close, communityName }) {
  const [ruleErrors, setRuleErrors] = useState("");
  const [reportErrors, setReportErrors] = useState("");
  const [descErrors, setDescErrors] = useState("");
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reportReason: "",
    appliesTo: "both",
    communityName: communityName,
  });

  useEffect(() => {
    async function fetchData() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token && cookies.username) {
        setToken(cookies.access_token);
      } else {
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  function handleRuleChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, title: value }));

    if (formData.title.length >= 100) {
      setRuleErrors(
        "Input length of " +
          (1 + formData.title.length) +
          " exceeds maximum length of 100",
      );
    } else {
      setRuleErrors("");
    }
  }

  function handleReportReasonChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, reportReason: value }));

    if (formData.reportReason.length >= 100) {
      setReportErrors(
        "Input length of " +
          (1 + formData.reportReason.length) +
          " exceeds maximum length of 100",
      );
    } else {
      setReportErrors("");
    }
  }

  function handleFullDescriptionChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, description: value }));

    if (formData.description.length >= 500) {
      setDescErrors(
        "Input length of " +
          (1 + formData.description.length) +
          " exceeds maximum length of 500",
      );
    } else {
      setDescErrors("");
    }
  }

  const handleclose = () => {
    close();
  };

  const addRule = async (values) => {
    try {
      apiHandler("/rule/add", "POST", values, token);
    } catch (error) {
      
    }
    close();
  };

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.titlebox}>
          <h1 className={styles.title}>Add a rule</h1>
          <div className={styles.closebutton} onClick={handleclose}>
            <CloseOutlinedIcon />
          </div>
        </div>

        <p className={styles.spliter}>
          ______________________________________________________
        </p>

        <br></br>

        <h2 className={styles.typestitle}>Rule</h2>
        <textarea
          className={styles.namebox}
          type="text"
          placeholder=" Rule displayed (e.g. 'No photos') "
          value={formData.title}
          onChange={handleRuleChange}
        ></textarea>
        {ruleErrors ? (
          <p className={styles.errorstext}>{ruleErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {100 - formData.title.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <h2 className={styles.typestitle}>Applies to</h2>

        <div className={styles.typestitlebox}>
          <input
            type="radio"
            value={formData.appliesTo == "both" ? true : false}
            className={styles.typestitlebutton}
            checked={formData.appliesTo == "both" ? true : false}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                appliesTo: "both",
              }))
            }
            name="radio"
          ></input>
          <div className={styles.typestitletexts}>
            <p className={styles.types}>Posts & comments</p>
          </div>
        </div>
        <div className={styles.typestitlebox}>
          <input
            type="radio"
            value={formData.appliesTo == "posts" ? true : false}
            checked={formData.appliesTo == "posts" ? true : false}
            className={styles.typestitlebutton}
            name="radio"
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                appliesTo: "posts",
              }))
            }
          ></input>

          <div className={styles.typestitletexts}>
            <p className={styles.types}>Posts only</p>
          </div>
        </div>
        <div className={styles.typestitlebox}>
          <input
            type="radio"
            value={formData.appliesTo == "comments" ? true : false}
            checked={formData.appliesTo == "comments" ? true : false}
            className={styles.typestitlebutton}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                appliesTo: "comments",
              }))
            }
            name="radio"
          ></input>

          <div className={styles.typestitletexts}>
            <p className={styles.types}>Comments only</p>
          </div>
        </div>

        <br></br>

        <h2 className={styles.typestitle}>Report reason</h2>
        <p className={styles.nameboxtitledesc}>
          Defaults to rule name if left blank.
        </p>
        <textarea
          className={styles.namebox}
          type="text"
          placeholder=" Reason rule is broken (e.g. 'This is a photo') "
          value={formData.reportReason}
          onChange={handleReportReasonChange}
        ></textarea>
        {reportErrors ? (
          <p className={styles.errorstext}>{reportErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {100 - formData.reportReason.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <h2 className={styles.typestitle}>Full description</h2>
        <textarea
          className={styles.descbox}
          type="text"
          placeholder=" Enter the full description of the rule. "
          value={formData.description}
          onChange={handleFullDescriptionChange}
        ></textarea>
        {descErrors ? (
          <p className={styles.errorstext}>{descErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {500 - formData.description.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <div className={styles.buttonsbox}>
          <button className={styles.buttons} onClick={handleclose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            disabled={
              !(formData.title && !(ruleErrors || reportErrors || descErrors))
            }
            onClick={() => addRule(formData)}
          >
            Add new rule
          </button>
        </div>
      </div>
    </div>
  );
}

export default RulesModal;
