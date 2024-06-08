import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DropdownItem from "../DropdownItem";
import dropdownOptions from "../dropdownOptions";

describe("DropdownItem component", () => {
  it("renders dropdown item with correct content", () => {
    const toggleMenuMock = jest.fn();
    const parentId = -1;
    const selectedId = 1;
    const parentObject = dropdownOptions.find(
      (option) => option.parentId === parentId,
    );
    const childObject =
      parentObject && parentObject.choices && parentObject.choices.length > 0
        ? parentObject.choices[selectedId - 1]
        : null;

    const { getByText } = render(
      <DropdownItem
        toggleMenu={toggleMenuMock}
        pId={parentId}
        selectedId={selectedId}
      />,
    );

    const iconElement = getByText(childObject.icon);
    const descElement = getByText(childObject.desc);

    expect(iconElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });

  it("calls toggleMenu function when clicked", () => {
    const toggleMenuMock = jest.fn();
    const parentId = -1;
    const selectedId = 1;

    const { container } = render(
      <DropdownItem
        toggleMenu={toggleMenuMock}
        pId={parentId}
        selectedId={selectedId}
      />,
    );

    fireEvent.click(container.firstChild);

    expect(toggleMenuMock).toHaveBeenCalled();
  });
});
