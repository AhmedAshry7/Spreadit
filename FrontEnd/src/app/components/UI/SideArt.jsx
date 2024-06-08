import React from "react";
import Image from "next/image";
import sideArt from "../../assets/reddit-side-art.png";

/**
 * Component for displaying the side art of a planet.
 * @component
 * @param   {string} className  The class name of the side art.
 * @param   {string} alt   alt text for the image.
 * @returns {JSX.Element} The rendered Info component.
 *
 * @example
 * //renders a SideArt component with alt text and class name
 * const className = "planet"
 * const alt = "Planet Art"
 * <SideArt className={className} alt={alt}/>
 */

function SideArt({ className, alt }) {
  return (
    <div className="PageColumn__left">
      <Image className={`art ${className}`} src={sideArt} alt={alt} />
    </div>
  );
}
export default SideArt;
