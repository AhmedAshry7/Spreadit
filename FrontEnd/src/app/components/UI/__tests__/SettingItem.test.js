import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import SettingItem from "../SettingItem";
import styles from "../Switch.module.css"; // Import styles

describe("SettingItem", () => {
  it("renders a switch setting item and toggles the switch", () => {
    const onItemClickMock = jest.fn();
    const option = {
      id: 1,
      title: "Switch Setting",
      description: "Description of the switch setting",
      type: "switch",
      subOptions: [],
    };

    render(<SettingItem option={option} onItemClick={onItemClickMock} />);

    const switchButton = document.getElementsByClassName(`${styles.switch}`)[0];

    fireEvent.click(switchButton);
    expect(onItemClickMock).toHaveBeenCalled();
  });

  it("renders a dropdown setting item and selects an option from the dropdown", () => {
    const onItemClickMock = jest.fn();
    const option = {
      id: 7,
      title: "Dropdown Setting",
      description: "Description of the dropdown setting",
      type: "dropdown",
    };

    const { getByText, getByLabelText, getByTestId } = render(
      <SettingItem
        option={option}
        defaultDropdown={1}
        dropDownClick={onItemClickMock}
      />,
    );

    const dropdownButton = getByText("New");
    expect(dropdownButton).toBeInTheDocument();

    fireEvent.mouseDown(dropdownButton);
    const dropdownOption = getByText("Rising");
    fireEvent.click(dropdownOption);
    expect(onItemClickMock).toHaveBeenCalled();
  });

  it("renders a button setting item and triggers a button click event", () => {
    const option = {
      id: 3,
      title: "Button Setting",
      description: "Description of the button setting",
      type: "button",
      buttontext: "Click Me",
    };

    const handleClick = jest.fn();

    const { getByText } = render(
      <SettingItem option={option} onItemClick={handleClick} />,
    );

    expect(getByText("Button Setting")).toBeInTheDocument();
    expect(getByText("Description of the button setting")).toBeInTheDocument();

    const button = getByText("Click Me");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders a locked switch setting item and prevents toggling when locked", () => {
    const onItemClickMock = jest.fn();
    const option = {
      id: 4,
      title: "Locked Switch Setting",
      description: "Description of the locked switch setting",
      type: "switch",
      subOptions: [],
    };

    const { getByLabelText } = render(
      <SettingItem
        option={option}
        isToggled={true}
        isLocked={true}
        onItemClick={onItemClickMock}
      />,
    );

    const switchButton = document.getElementsByClassName(`${styles.switch}`)[0];

    fireEvent.click(switchButton);
    expect(onItemClickMock).not.toHaveBeenCalled();
  });
});
