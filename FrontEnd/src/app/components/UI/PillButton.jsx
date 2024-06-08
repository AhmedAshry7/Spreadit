import React from "react";
import styles from "./PillButton.module.css";
import Image from "next/image";

/**
 * Pill Shaped Button Component.
 * @compoenent
 * @param   {string} text   The text to be displayed on the button [Required]
 * @param   {string} image   The path to the image for the button [Optional]
 * @param   {function} onClick   The function to be called when the button is clicked [Required]
 * @returns {JSX.Element} The component of the pill button
 *
 * @example
 * //renders a PillButton component with text and onClick function
 * const text = "Click Me"
 * const onClick = () => console.log("Button Clicked")
 * <PillButton text={text} onClick={onClick}/>
 *
 *
 * @example
 * //renders a PillButton component with text, image and onClick function
 * const text = "Click Me"
 * const image = "path/to/image"
 * const onClick = () => console.log("Button Clicked")
 * <PillButton text={text} image={image} onClick={onClick}/>
 *
 */

function PillButton({ text, image, onClick }) {
  return (
    <>
      <button
        data-testid="button-test"
        className={styles.btn}
        onClick={onClick}
      >
        {image && (
          <Image src={image} alt="button image" width={16} height={16} />
        )}
        <span>{text}</span>
      </button>
    </>
  );
}

export default PillButton;
