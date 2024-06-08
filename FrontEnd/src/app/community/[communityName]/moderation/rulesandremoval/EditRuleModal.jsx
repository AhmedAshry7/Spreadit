import React, { useState, useEffect } from "react";
import styles from "./EditRuleModal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import getCookies from "@/app/utils/getCookies";
import apiHandler from "@/app/utils/apiHandler.js";

/**
 * Component representing a modal for editing a rule
 * @component
 * @param {Object} props Component props
 * @param {Function} props.close Function to close the modal
 * @param {string} props.rule The title of the rule being edited
 * @param {boolean} props.postsandcomments Indicates if the rule applies to posts and comments
 * @param {boolean} props.postsonly Indicates if the rule applies to posts only
 * @param {boolean} props.commentsonly Indicates if the rule applies to comments only
 * @param {string} props.reportreason The reason for reporting the rule
 * @param {string} props.description The full description of the rule
 * @param {string} props.communityName The name of the community
 * @returns {JSX.Element} JSX element representing a modal for editing a rule
 *
 * @example
 * // Renders a modal for editing a rule
 * <EditRulesModal
 *   close={console.log("Close modal")}
 *   rule="No photos"
 *   postsandcomments={true}
 *   postsonly={false}
 *   commentsonly={false}
 *   reportreason="This is a photo"
 *   description="This rule doesnt allow the posting of photos"
 *   communityName="Community"
 * />
 */

function EditRulesModal({
  close,
  rule,
  postsandcomments,
  postsonly,
  commentsonly,
  reportreason,
  description,
  communityName,
}) {
  const [ruleErrors, setRuleErrors] = useState("");
  const [reportErrors, setReportErrors] = useState("");
  const [descErrors, setDescErrors] = useState("");
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    communityName: communityName,
    oldTitle: rule,
    newRule: {
      title: rule,
      reportReason: reportreason,
      description: description,
      appliesTo: postsandcomments
        ? "both"
        : postsonly
          ? "posts"
          : commentsonly
            ? "comments"
            : "",
      communityName: communityName,
    },
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRule: { ...prevFormData.newRule, title: value },
    }));

    if (formData.newRule.title.length >= 100) {
      setRuleErrors(
        "Input length of " +
          (1 + formData.newRule.title.length) +
          " exceeds maximum length of 100",
      );
    } else {
      setRuleErrors("");
    }
  }

  function handleReportReasonChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRule: { ...prevFormData.newRule, title: value },
    }));

    if (formData.newRule.reportReason.length >= 100) {
      setReportErrors(
        "Input length of " +
          (1 + formData.newRule.reportReason.length) +
          " exceeds maximum length of 100",
      );
    } else {
      setReportErrors("");
    }
  }

  function handleFullDescriptionChange(event) {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRule: { ...prevFormData.newRule, description: value },
    }));

    if (formData.newRule.description.length >= 500) {
      setDescErrors(
        "Input length of " +
          (1 + formData.newRule.description.length) +
          " exceeds maximum length of 500",
      );
    } else {
      setDescErrors("");
    }
  }

  const handleclose = () => {
    close();
  };

  const editRule = async (values) => {
    try {
      apiHandler("/rule/edit", "PUT", values, token);
    } catch (error) {
      
    }
    close();
  };

  const deleteRule = async (values) => {
    try {
      apiHandler(
        "/rule/remove",
        "POST",
        { communityName: values.communityName, title: values.oldTitle },
        token,
      );
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
          value={formData.newRule.title}
          onChange={handleRuleChange}
        ></textarea>
        {ruleErrors ? (
          <p className={styles.errorstext}>{ruleErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {100 - formData.newRule.title.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <h2 className={styles.typestitle}>Applies to</h2>

        <div className={styles.typestitlebox}>
          <input
            type="radio"
            value={formData.newRule.appliesTo == "both" ? true : false}
            className={styles.typestitlebutton}
            checked={formData.newRule.appliesTo == "both" ? true : false}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                newRule: { ...prevFormData.newRule, appliesTo: "both" },
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
            value={formData.newRule.appliesTo == "posts" ? true : false}
            checked={formData.newRule.appliesTo == "posts" ? true : false}
            className={styles.typestitlebutton}
            name="radio"
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                newRule: { ...prevFormData.newRule, appliesTo: "posts" },
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
            value={formData.newRule.appliesTo == "comments" ? true : false}
            checked={formData.newRule.appliesTo == "comments" ? true : false}
            className={styles.typestitlebutton}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                newRule: { ...prevFormData.newRule, appliesTo: "comments" },
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
          value={formData.newRule.reportReason}
          onChange={handleReportReasonChange}
        ></textarea>
        {reportErrors ? (
          <p className={styles.errorstext}>{reportErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {100 - formData.newRule.reportReason.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <h2 className={styles.typestitle}>Full description</h2>
        <textarea
          className={styles.descbox}
          type="text"
          placeholder=" Enter the full description of the rule. "
          value={formData.newRule.description}
          onChange={handleFullDescriptionChange}
        ></textarea>
        {descErrors ? (
          <p className={styles.errorstext}>{descErrors}</p>
        ) : (
          <p className={styles.nameboxdesc}>
            {" "}
            {500 - formData.newRule.description.length} Charcters remaining{" "}
          </p>
        )}

        <br></br>

        <div className={styles.buttonsbox}>
          <button
            className={styles.deletebutton}
            onClick={() => deleteRule(formData)}
          >
            Delete
          </button>
          <button className={styles.buttons} onClick={handleclose}>
            Cancel
          </button>
          <button
            className={styles.buttons}
            disabled={
              !(
                formData.newRule.title &&
                !(ruleErrors || reportErrors || descErrors)
              )
            }
            onClick={() => editRule(formData)}
          >
            Update rule
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRulesModal;
