import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dropdownmenu from "../Dropdownmenu";
import dropdownOptions from "../dropdownOptions";

describe("Dropdownmenu component", () => {
  it("renders dropdown menu with correct options", () => {
    const closeMenuMock = jest.fn();
    const onSelectMock = jest.fn();
    const parentId = 7;
    const initialSelectedId = 2;
    const parentObject = dropdownOptions.find(
      (option) => option.parentId === parentId,
    );

    const { getByText } = render(
      <Dropdownmenu
        closeMenu={closeMenuMock}
        pId={parentId}
        onSelect={onSelectMock}
        selectedId={initialSelectedId}
      />,
    );

    parentObject.choices.forEach((option) => {
      const iconElement = getByText(option.icon);
      const descElement = getByText(option.desc);
      expect(iconElement).toBeInTheDocument();
      expect(descElement).toBeInTheDocument();
    });
  });

  it("calls onSelect function with correct ID when an item is clicked", () => {
    const closeMenuMock = jest.fn();
    const onSelectMock = jest.fn();
    const parentId = 7;
    const initialSelectedId = 2;

    const { getByText } = render(
      <Dropdownmenu
        closeMenu={closeMenuMock}
        pId={parentId}
        onSelect={onSelectMock}
        selectedId={initialSelectedId}
      />,
    );

    const optionToSelect = dropdownOptions.find(
      (option) => option.parentId === parentId,
    ).choices[0];
    const optionElement = getByText(optionToSelect.desc);

    fireEvent.click(optionElement);

    expect(onSelectMock).toHaveBeenCalledWith(optionToSelect.dropId);
  });
});
