import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Checkbox from "../Checkbox";

describe("Checkbox", () => {
  test("renders checkbox component", () => {
    // Arrange
    const onToggleMock = jest.fn();
    const label = "Checkbox Label";

    // Act
    const { getByTestId } = render(
      <Checkbox label={label} isChecked={false} onToggle={onToggleMock} />,
    );

    // Assert
    expect(getByTestId("checkbox")).toBeInTheDocument();
  });

  test("disabled checkbox cannot be toggled", () => {
    // Arrange
    const onToggleMock = jest.fn();
    const label = "Checkbox Label";
    const { getByTestId } = render(
      <Checkbox
        label={label}
        isChecked={false}
        onToggle={onToggleMock}
        isDisabled={true}
      />,
    );
    const checkbox = getByTestId("checkbox-input");

    // Act: Click on the disabled checkbox
    fireEvent.click(checkbox);

    // Assert: Check that the toggle callback function is not called
    expect(onToggleMock).not.toHaveBeenCalled();
  });

  test("clicking the checkbox toggles its status", () => {
    // Arrange
    const onToggleMock = jest.fn();
    const label = "Checkbox Label";
    const { getByTestId } = render(
      <Checkbox label={label} isChecked={false} onToggle={onToggleMock} />,
    );

    const checkbox = getByTestId("checkbox");
    const checkboxInput = checkbox.querySelector("input");

    // Act: Click on the checkbox
    fireEvent.click(checkbox);

    // Assert: Check if the status is toggled
    expect(checkboxInput).toHaveValue("true"); // Assuming the input's value represents the checked status

    // Act: Click again to toggle back
    fireEvent.click(checkbox);

    // Assert: Check if the status is toggled back
    expect(checkboxInput).toHaveValue("false");
  });
});
