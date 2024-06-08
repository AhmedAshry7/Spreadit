import Image from "next/image";
import React from "react";
import logo from "../assets/logoSpreadIt.svg";
import "./Create.css";

/**
 * Component for the header section of the post creation interface.
 * @component
 * @returns {JSX.Element} The rendered CreateLeftHeader component.
 *
 * @example
 * // Renders the CreateLeftHeader component.
 * <CreateLeftHeader />;
 */

export default function CreateLeftHeader() {
  return (
    <div className="createLeftFlexHeader">
      <div className="createLeftFlexHeaderTitle">Create a post</div>
      {/*<button className="createLeftFlexHeaderButton create--buttonStyle create--buttonContent create--buttonColor">
        Drafts
        <span className="createLeftFlexHeaderCounter">0</span>
      </button>*/}
    </div>
  );
}
