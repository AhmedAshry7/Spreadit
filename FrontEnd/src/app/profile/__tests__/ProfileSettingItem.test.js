import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileSettingItem from "../ProfileSettingItem";
import "@testing-library/jest-dom";

describe("ProfileSettingItem component", () => {
  test("renders ProfileSettingItem component with SVG", () => {
    const { getByText, getByAltText } = render(
      <ProfileSettingItem
        title="Avatar"
        description={"Customize and Style"}
        isSvg={true}
        image={"../../assets/follow.svg"}
        buttonText={"Style Avatar"}
      />,
    );
    expect(getByText("Avatar")).toBeInTheDocument();
    expect(getByText("Customize and Style")).toBeInTheDocument();
    expect(getByText("Style Avatar")).toBeInTheDocument();
    expect(getByAltText("setting icon")).toBeInTheDocument();
  });

  test("renders ProfileSettingItem component with Image", () => {
    const { getByText, getByAltText } = render(
      <ProfileSettingItem
        title="Profile"
        description={"Customize your profile"}
        isSvg={false}
        image={"/../../assets/awwpfp.jpg"}
        buttonText={"Edit Profile"}
      />,
    );
    expect(getByText("Profile")).toBeInTheDocument();
    expect(getByText("Customize your profile")).toBeInTheDocument();
    expect(getByText("Edit Profile")).toBeInTheDocument();
    expect(getByAltText("profile picture")).toBeInTheDocument();
  });

  test("ProfileSettingItem component button click", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ProfileSettingItem
        title="Profile"
        description={"Customize your profile"}
        isSvg={false}
        image={"/../../assets/awwpfp.jpg"}
        buttonText={"Edit Profile"}
        onClick={onClick}
      />,
    );
    const button = getByTestId("button-test");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
