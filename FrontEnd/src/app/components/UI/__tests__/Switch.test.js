import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toogle from "../Switch";
import "@testing-library/jest-dom";

describe("Toggle component", () => {
  it("renders title and description correctly", () => {
    const { getByText } = render(
      <Toogle optionTitle="Name" optionDescription="Description" />,
    );

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Description")).toBeInTheDocument();
  });

  it("is set as enabled by default", () => {
    const { container } = render(<Toogle />);

    expect(container.firstChild).not.toHaveClass("disabledOption");
  });

  it("gets disabled correctly", () => {
    const { container } = render(<Toogle disabled />);

    expect(container.firstChild).toHaveClass("disabledOption");
  });

  it("correctly reflects toggled state", () => {
    const { container } = render(<Toogle isToggled={true} />);
    const toggleInput = container.querySelector('input[type="checkbox"]');

    expect(toggleInput).toBeChecked();
  });

  it("calls onChnage function when clicked", () => {
    const handleToggle = jest.fn();
    const { container } = render(
      <Toogle isToggled={false} onToggle={handleToggle} />,
    );
    const toggleInput = container.querySelector('input[type="checkbox"]');

    fireEvent.click(toggleInput);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
