import React, { useEffect, useState } from "react";
import styles from "./PollCreator.module.css";
import Listbutton from "../components/UI/Listbutton";

/**
 * Component for creating and configuring a poll.
 * @component
 * @param   {Array} options    Array of poll options.
 * @param   {function} setOptions   Function to update the poll options.
 * @param   {number} length    Duration of the poll in days.
 * @param   {function} setLength   Function to update the poll duration.
 * @returns {JSX.Element} The rendered PollCreator component.
 *
 * // Renders the PollCreator component with custom options and length.
 * <PollCreator
 *   options={[{ option: 'Option 1', votes: 0 }, { option: 'Option 2', votes: 0 }]}
 *   setOptions={setOptionsFunction}
 *   length={7}
 *   setLength={setLengthFunction}
 * />;
 */

function PollCreator({ options, setOptions, length, setLength }) {
  const votingLength = [
    "1 Day",
    "2 Days",
    "3 Days",
    "4 Days",
    "5 Days",
    "6 Days",
    "7 Days",
  ];

  const deleteOption = (id) => {
    // Filter out the option with the given id
    const updatedOptions = options.filter((item, index) => index !== id);
    // Update the state with the new array
    setOptions(updatedOptions);
  };

  const handleLengthChoose = (day) => {
    if (day === "1 Day") setLength(1);
    else if (day === "2 Days") setLength(2);
    else if (day === "3 Days") setLength(3);
    else if (day === "4 Days") setLength(4);
    else if (day === "5 Days") setLength(5);
    else if (day === "6 Days") setLength(6);
    else if (day === "7 Days") setLength(7);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].option = value; // Update the option value
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, { option: "", votes: 0 }]); // Initialize votes to zero
    }
  };

  return (
    <div className={styles.pollContainer}>
      <div className={styles.pollFlex}>
        <div className={styles.pollLeft}>
          {options.map((option, index) => (
            <div key={index} className={styles.pollItemPadding}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className={styles.pollItemTextbox}
              />
              {index > 1 && (
                <svg
                  className={styles.deleteIcon}
                  data-testid="deleteicon"
                  onClick={() => deleteOption(index)}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.5,2H12.71l-.85-.85A.5.5,0,0,0,11.5,1h-3a.5.5,0,0,0-.35.15L7.29,2H3.5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-1A.5.5,0,0,0,16.5,2Z"></path>
                  <path d="M16.5,5H3.5a.5.5,0,0,0-.5.5v12A1.5,1.5,0,0,0,4.5,19h11A1.5,1.5,0,0,0,17,17.5V5.5A.5.5,0,0,0,16.5,5ZM6.75,15.5a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Z"></path>
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className={styles.pollRight}>
          <div className={styles.pollRightHeader}>
            <svg
              className={styles.infoIcon}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                {" "}
                <path d="M10,8.5 C10.553,8.5 11,8.948 11,9.5 L11,13.5 C11,14.052 10.553,14.5 10,14.5 C9.447,14.5 9,14.052 9,13.5 L9,9.5 C9,8.948 9.447,8.5 10,8.5 Z M10.7002,5.79 C10.8012,5.89 10.8702,6 10.9212,6.12 C10.9712,6.24 11.0002,6.37 11.0002,6.5 C11.0002,6.57 10.9902,6.63 10.9802,6.7 C10.9712,6.76 10.9502,6.82 10.9212,6.88 C10.9002,6.94 10.8702,7 10.8302,7.05 C10.7902,7.11 10.7502,7.16 10.7002,7.21 C10.6602,7.25 10.6102,7.29 10.5512,7.33 C10.5002,7.37 10.4402,7.4 10.3812,7.42 C10.3202,7.45 10.2612,7.47 10.1902,7.48 C10.1312,7.49 10.0602,7.5 10.0002,7.5 C9.7402,7.5 9.4802,7.39 9.2902,7.21 C9.1102,7.02 9.0002,6.77 9.0002,6.5 C9.0002,6.37 9.0302,6.24 9.0802,6.12 C9.1312,5.99 9.2002,5.89 9.2902,5.79 C9.5202,5.56 9.8702,5.46 10.1902,5.52 C10.2612,5.53 10.3202,5.55 10.3812,5.58 C10.4402,5.6 10.5002,5.63 10.5512,5.67 C10.6102,5.71 10.6602,5.75 10.7002,5.79 Z M10,16 C6.691,16 4,13.309 4,10 C4,6.691 6.691,4 10,4 C13.309,4 16,6.691 16,10 C16,13.309 13.309,16 10,16 M10,2 C5.589,2 2,5.589 2,10 C2,14.411 5.589,18 10,18 C14.411,18 18,14.411 18,10 C18,5.589 14.411,2 10,2"></path>
              </g>
            </svg>
            <div className={styles.pollRightHeaderText}>
              Tips on Better Polls
            </div>
          </div>
          <ol className={styles.pollRightList}>
            <li className={styles.pollRightListBullet}>
              Suggest short clear options
            </li>
            <li className={styles.pollRightListBullet}>
              The more options, the better
            </li>
            <li className={styles.pollRightListBullet}>
              Choose the poll duration
            </li>
            <li className={styles.pollRightListBullet}>
              Options can't be edited after post creation
            </li>
          </ol>
        </div>
      </div>
      <div className={`${styles.pollSettingsFlex} ${styles.pollItemPadding}`}>
        <button
          onClick={handleAddOption}
          disabled={options.length >= 6}
          className={`${styles.addBtnFlex} ${styles.addBtnColor} ${styles.addBtnFont}`}
        >
          Add Option
        </button>
        <div className={styles.votelengthFlex}>
          <div className={styles.votelengthText}>Voting length</div>
          <Listbutton
            list={votingLength}
            initialv={length + (length === 1 ? " Day" : " Days")}
            choose={handleLengthChoose}
          ></Listbutton>
        </div>
      </div>
      {/* Additional features like voting length can be added here */}
    </div>
  );
}

export default PollCreator;
