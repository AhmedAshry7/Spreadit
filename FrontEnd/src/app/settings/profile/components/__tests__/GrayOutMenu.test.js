import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import GrayOutMenuWrapper from "../GrayOutMenuWrapper";
import GrayOutMenu from "../GrayOutMenuWrapper";

describe("GrayOutMenuWrapper component", () => {
  it("renders the menu closed by default", () => {
    const onClose = jest.fn();
    render(<GrayOutMenuWrapper isOpen={false} onClose={onClose} />);
    const menu = screen.queryByText("Add social link");

    expect(menu).toBeNull();
  });

  it("renders the menu open when isOpen is true", () => {
    const onClose = jest.fn();
    render(<GrayOutMenuWrapper isOpen={true} onClose={onClose} />);
    const menu = screen.queryByText("Spreadit");

    expect(menu).not.toBeNull();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <GrayOutMenuWrapper isOpen={true} onClose={onClose} />,
    );
    const closeButton = document.getElementsByClassName("color-X")[0];

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
