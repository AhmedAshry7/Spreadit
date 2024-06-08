import { useEffect, useState } from "react";
import styles from "./Poll.module.css";
import Button from "./Button";
import Image from "next/image";
import check from "../../assets/check.svg";
import parseTime from "../../utils/timeDifference";

/**
 * Component for displaying a poll with voting options and results.
 * @component
 * @param {boolean} isOpen - Indicates whether the poll is open or closed.
 * @param {Array<{ option: string, votes: number }>} options - An array of objects representing poll options and their respective vote counts.
 * @param {Function} onVote - Function to handle voting on an option.
 * @param {string} pollExpiration - String representing the expiration time of the poll (in ISO date format).
 * @param {string} myVote - The option selected by the current user, if any(if user hasn't voted before send "").
 * @returns {JSX.Element} The rendered Poll component.
 *
 * @example
 * // Renders a Poll component with open status, options, and voting functionality that the user hadn't already voted in.
 * <Poll isOpen={true} options={[{ option: "Option A", votes: 10 }, { option: "Option B", votes: 5 }]} onVote={handleVote} pollExpiration="2024-04-20T12:00:00Z" myVote="" />
 * @example
 * // Renders a Poll component with open status, options, and voting functionality that the user has already voted in.
 * <Poll isOpen={true} options={[{ option: "Option A", votes: 10 }, { option: "Option B", votes: 5 }]} onVote={handleVote} pollExpiration="2024-04-20T12:00:00Z" myVote="Option B" />
 */

function Poll({ isOpen, options, onVote, pollExpiration, myVote }) {
  const myVoteIndex = options.findIndex(
    (optionObj) => optionObj.option === myVote,
  );

  let totalVotes = options.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.votes;
  }, 0);

  const [selectedChoice, setSelectedChoice] = useState(-1);
  const [wininngChoice, setWinningChoice] = useState(-1);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const indexOfMaxVotes = options.reduce(
      (maxIndex, currentObject, currentIndex) => {
        return currentObject.votes > options[maxIndex].votes
          ? currentIndex
          : maxIndex;
      },
      0,
    );
    setWinningChoice(indexOfMaxVotes);
  }, [hasVoted]);

  useEffect(() => {
    if (myVoteIndex !== -1) {
      setHasVoted(true);
      setSelectedChoice(myVoteIndex);
    }
  }, []);

  function handleVote() {
    onVote(options[selectedChoice]);
    totalVotes += 1;
    options[selectedChoice].votes += 1;
    setHasVoted(true);
  }

  return (
    <div
      className={styles.poll}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {totalVotes !== 0 && (
        <div className={styles.header}>
          {isOpen && <div className={styles.open}>Open</div>}
          {!isOpen && <div className={styles.open}>Closed</div>}
          <div>•</div>
          <div className={styles.totalVotes}>{`${totalVotes} total votes`}</div>
        </div>
      )}
      {!hasVoted && isOpen === true && (
        <div className={styles.body}>
          {options.map((optionObject, index) => (
            <div className={styles.radio} key={index}>
              <input
                className={`${styles.radioButton} ${selectedChoice === index ? styles.selected : ""}`}
                onClick={() => {
                  setSelectedChoice(index);
                }}
                type="radio"
                id={`option${index}`}
                name="options"
                value={optionObject.option}
              />
              <label htmlFor={`option${index}`}>{optionObject.option}</label>
            </div>
          ))}
        </div>
      )}
      {(hasVoted || !isOpen) && (
        <div className={styles.body}>
          {options.map((optionObject, index) => (
            <div
              className={`${styles.results} ${index === wininngChoice ? styles.selected : ""}`}
              key={index}
            >
              <div className={styles.votes}>{optionObject.votes}</div>
              <div>{optionObject.option}</div>
              {hasVoted && selectedChoice === index && (
                <Image
                  src={check}
                  width={16}
                  height={16}
                  viewBox="0 0 20 20"
                  alt="selected choice"
                />
              )}
            </div>
          ))}
        </div>
      )}
      <div className={styles.footer}>
        {!isOpen && (
          <div
            className={styles.closingIn}
          >{`Voting closed ${parseTime(pollExpiration)}`}</div>
        )}
        {isOpen && !hasVoted && (
          <div className={styles.footerContent}>
            <div className={styles.voteButton}>
              {selectedChoice === -1 && (
                <Button name={"Vote"} active={false}></Button>
              )}
              {selectedChoice !== -1 && (
                <Button
                  name={"Vote"}
                  active={true}
                  onClick={() => handleVote()}
                ></Button>
              )}
            </div>
            <div
              className={styles.closingIn}
            >{`Closes in ${parseTime(pollExpiration)}`}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Poll;
