import Image from "next/image";
import React from "react";
import SettingItem from "../../components/UI/SettingItem.jsx";
import optionData from "../options.js";

/**
 * Component for advanced section in the profile settings page.
 * @component
 * @param   {Object} props         The props passed
 * @param   {Function} props.clickEvent   The function to be called when a switch is clicked inside the SettingItem component/container
 * @param   {boolean[]} props.array     An array of API predetermined / saved true/false values for the switch components, created in Profile component
 * @returns {JSX.Element} The rendered ProfileAbout component.
 *
 * @example
 * //Renders the advanced section with a console log click event, and setting by default the switches to be on
 * <ProfileAdvanced props.isToggled={true} props.clickEvent={console.log(`Toggle state now: ${isToggled}`)} />;
 */
export default function ProfileAdvanced(props) {
  return (
    <div>
      {optionData.map(
        (option) =>
          option.id < 18 &&
          13 < option.id && (
            <SettingItem
              key={option.id}
              option={option}
              onItemClick={props.clickEvent}
              isToggled={props.array[option.id]}
            />
          ),
      )}
    </div>
  );
}
