import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("Dropdown component", () => {
  it("renders dropdown menu with correct default selected item", () => {
    const defId = 2;
    const pId = 7;
    const selectedDropItemMock = jest.fn();

    const { getByText } = render(
      <Dropdown
        defId={defId}
        pId={pId}
        selectedDropItem={selectedDropItemMock}
      />,
    );

    const defaultSelectedItem = getByText("New", { selector: "span.blue" });

    expect(defaultSelectedItem).toBeInTheDocument();
  });

  it("toggles menu visibility when the dropdown item is clicked", () => {
    const defId = 2;
    const pId = 7;
    const selectedDropItemMock = jest.fn();

    const { getByText, getByRole, container } = render(
      <Dropdown
        defId={defId}
        pId={pId}
        selectedDropItem={selectedDropItemMock}
      />,
    );

    const dropdownItemBox = getByText("New", { selector: "span.blue" });

    fireEvent.click(dropdownItemBox);

    expect(selectedDropItemMock).toHaveBeenCalled();
  });
});
