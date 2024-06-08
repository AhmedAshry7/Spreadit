import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlueButton from "../BlueButton";

describe("BlueButton component", () => {
  it("renders the children correctly", () => {
    const { getByText } = render(<BlueButton>Click me</BlueButton>);

    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <BlueButton onClick={handleClick}>Click me</BlueButton>,
    );

    fireEvent.click(getByText("Click me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
