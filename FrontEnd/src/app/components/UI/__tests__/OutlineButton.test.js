import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OutlineButton from "../OutlineButton";

describe("OutlineButton component", () => {
  it("renders the children correctly", () => {
    const { getByText } = render(<OutlineButton children={"Click me"} />);

    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <OutlineButton btnClick={handleClick} children="Click me" />,
    );

    fireEvent.click(getByText("Click me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
