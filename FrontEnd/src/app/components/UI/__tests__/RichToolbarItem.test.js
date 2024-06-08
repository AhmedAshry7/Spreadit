import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RichToolbarItem from "../RichToolbarItem";

describe("RichToolbarItem", () => {
  test("calls onClick function when button is clicked", () => {
    // Mock onClick function
    const onClick = jest.fn();

    // Render the component with the onClick function
    const { getByRole } = render(
      <RichToolbarItem
        onClick={onClick}
        ariaLabel="Test Button"
        ariaSelected={false}
        className="test-class"
        icon={<div>Test Icon</div>}
      />,
    );

    // Find the button element and simulate a click event
    const button = getByRole("button");
    fireEvent.click(button);

    // Assert that the onClick function is called once
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
