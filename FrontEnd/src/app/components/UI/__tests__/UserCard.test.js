jest.mock("../../assets/mailimage.png", () => ({
  width: 100,
  heigth: 100,
}));
/*   jest.mock("../../assets/people.svg", () => ({
    width: 100,
    heigth:100,
  })); */

import React from "react";
import { render } from "@testing-library/react";
import UserCard from "../UserCard";

describe("The UserCard component tests", () => {
  const props = {
    name: "abdullah12",
    profilePicture: "../../assets/mailimage.png",
    latestMeassageText: "Hello there!",
    isSelected: false,
    display: true,
  };

  test("renders user card with profile picture correctly", () => {
    const { getByAltText, getByText } = render(<UserCard {...props} />);
    expect(getByAltText("profile picture")).toBeInTheDocument();
    expect(getByAltText("profile picture")).toHaveAttribute(
      "src",
      props.profilePicture,
    );
    expect(getByText("abdullah12")).toBeInTheDocument();
    expect(getByText("Hello there!")).toBeInTheDocument();
  });

  test("applies selected style when isSelected is true", () => {
    const propsSelected = { ...props, isSelected: true };
    const { getByTestId } = render(<UserCard {...propsSelected} />);
    expect(getByTestId("card-holder")).toHaveClass("cardholderselected");
  });

  test("applies display style when display is true", () => {
    const { getByTestId } = render(<UserCard {...props} />);
    expect(getByTestId("card-holder")).toHaveClass("cardholder");
  });

  test("does not render user card when display is false", () => {
    const propsHidden = { ...props, display: false };
    const { getByTestId } = render(<UserCard {...propsHidden} />);
    expect(getByTestId("card-holder")).toHaveClass("none");
  });
});
