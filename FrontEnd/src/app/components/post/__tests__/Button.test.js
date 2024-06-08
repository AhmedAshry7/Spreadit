import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("renders button name", () => {
    const { getByText } = render(<Button name="Name" />);

    expect(getByText("Name")).toBeInTheDocument();
  });

  it("is set as active by default", () => {
    const { container } = render(<Button />);

    expect(container.firstChild).not.toHaveClass("inactive");
  });

  it("gets set as inactive correctly", () => {
    const { getByText } = render(<Button name={"Name"} active={false} />);

    expect(getByText("Name")).toHaveClass("inactive");
  });

  it("calls onChnage function when clicked", () => {
    const handleClick = jest.fn();
    const { container } = render(<Button onClick={handleClick} />);
    const clickButton = container.querySelector('button[type="button"]');

    fireEvent.click(clickButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
