jest.mock("../../assets/PP1.png", () => ({
  width: 100,
  heigth: 100,
}));
jest.mock("../../assets/PP2.png", () => ({
  width: 100,
  heigth: 100,
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blockedmuted from "../Blockedmuted";
import { expect } from "@jest/globals";

describe("The Blockedmuted tests", () => {
  const mockRemove = jest.fn();

  beforeEach(() => {
    render(
      <Blockedmuted
        profilename="common-winter"
        path={1}
        onRemove={mockRemove}
      />,
    );
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("common-winter")).toBeInTheDocument();
    expect(screen.getByText("REMOVE")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it calls onRemove when the Remove button is clicked  ", () => {
    const removeButton = screen.getByText("REMOVE");
    fireEvent.click(removeButton);
    expect(mockRemove).toHaveBeenCalledWith("common-winter");
    //expect(false).toBe(true);
  });
});
