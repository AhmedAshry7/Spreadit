import React, { useState, useEffect } from "react";
import "./dropdown.css";
import Dropdownmenu from "./Dropdownmenu";
import dropdownOptions from "./dropdownOptions";

function DropdownItem({ toggleMenu, pId = -1, selectedId = 1 }) {
  const parentObject = dropdownOptions.find(
    (option) => option.parentId === pId,
  );
  const childObject =
    parentObject && parentObject.choices && parentObject.choices.length > 0
      ? parentObject.choices[selectedId - 1]
      : null;
  return (
    <div className="_2gyG4Nl0mMXg9j65G_cVwp" onClick={toggleMenu}>
      <div
        className="_2OI2GNt8U_hqISJzbsrb0Y"
        data-testid="subreddit-sort-setting-listing"
      >
        <div className="Mw10gImD3M_Xbm-yM9eyH">
          <button
            role="menuitem"
            className="blue _10K5i7NW6qcm-UoCtpB3aK _3LwUIE7yX7CZQKmD2L87vf _183U1ds639-b2Av2n7Mdt_ _1IKtbRloF_LV1hPqMzP3MC"
          >
            <span className="pthKOcceozMuXLYrLlbL1">{childObject.icon}</span>
            <span className="_2-cXnP74241WI7fpcpfPmg">{childObject.desc}</span>
          </button>
          <span>
            <svg
              className="XHbKeEqnW58ib9mTN6jnS u_kypUXmB-k1A5TcC8MI9"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DropdownItem;
