import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GrayButton from "../GrayButton";

describe("GrayButton component", () => {
  it("renders the button with children correctly", () => {
    const { getByText } = render(<GrayButton>Click me</GrayButton>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events when not disabled", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <GrayButton wasClicked={handleClick}>Click me</GrayButton>,
    );
    fireEvent.click(getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when isDisabled is true", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <GrayButton wasClicked={handleClick} isDisabled={true}>
        Click me
      </GrayButton>,
    );
    const button = getByText("Click me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
