import React from "react";
import { useState, useRef, useEffect } from "react";
import Styles from "./Listbutton.module.css";

/**
 * toogles a menu and shows a list and chooses one from them 
 * @component
 * @param {list} list The list to be selected from
 * @param {string} type The type of the list
 * @param {string} initialv The intialization value
 * @param {string} description  The description of the list
 * @param {string} displayedColor The color of the list button
 * @param {function} choose functon to be called when item is clicked
 * @returns {JSX.Element} The rendered ChangeEmailModal component.
 * 
 * @example
 * const list={["MAN","WOMAN"]}
 * const listtype="gender"
 * const intialValue="MAN"
 * description="select the gender"
 * const listColor={"blue"}
 * function print() {console.log("Activated")}
 * <Listbutton 
                list={list}
                type={listtype}
                initialv={intialValue}
                description={description}
                displayedColor={listColor}
                choose={print()}
            /> 
 */

const Changegendercountry = (props) => {
  const [showList, setShowList] = useState(false);

  const [selectedItem, setSelectedItem] = useState(props.initialv);

  const ref = useRef(null);

  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setShowList(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    props.choose(item);
    setShowList(false);
    props.choose(item);
  };

  return (
    <div className={Styles.smallcontainer}>
      <div className={Styles.changecontainer}>
        <div className={Styles.text}>
          <h3 className={Styles.subsectiontitle}>{props.type}</h3>
          <p className={Styles.description}>{props.description}</p>
        </div>
        <div className={Styles.list}>
          <button
            className={`${Styles.openlistbutton} ${props.displayedColor === "blue" ? Styles.blueButton : Styles.greyButton}`}
            onClick={() => setShowList(!showList)}
          >
            {selectedItem}
          </button>
          {showList && (
            <ul className={Styles.unorderedlist} ref={ref}>
              {props.list.map((item, index) => (
                <li
                  className={`${Styles.listitem} ${selectedItem === item ? Styles.selected : ""}`}
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Changegendercountry;
