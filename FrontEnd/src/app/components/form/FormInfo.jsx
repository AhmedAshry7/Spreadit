import React from "react";
import Image from "next/image";
import logo from "../../assets/logoSpreadIt.svg";
import styles from "./FormInfo.module.css";

/**
 * Component for displaying info about the form.
 * @component
 * @param   {string} title   Title of the form.
 * @param   {string} description   Description of the form.
 * @returns {JSX.Element} The rendered Info component.
 *
 * @example
 * //renders a FormInfo component with title and description
 * const title = "Title"
 * const description = "Description"
 * <FormInfo title={title} description={description}/>
 */
function FormInfo({ title, description }) {
  return (
    <div>
      <div className="form_logo">
        <Image src={logo} alt="Spreadit Logo." height={40} />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default FormInfo;
