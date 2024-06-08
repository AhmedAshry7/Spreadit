import React from "react";
import { render } from "@testing-library/react";
import BottomHelp from "../BottomHelp";
import "@testing-library/jest-dom";

describe("Bottom Help component", () => {
  it("renders Component without children correctly", () => {
    const { getAllByRole } = render(<BottomHelp />);
    const allLinks = getAllByRole("link");
    expect(allLinks.length).toBe(3);
  });

  it("renders Component with children correctly", () => {
    const { getByText, getAllByRole } = render(
      <BottomHelp>Some Children</BottomHelp>,
    );
    expect(getByText("Some Children")).toBeInTheDocument();
    const allLinks = getAllByRole("link");
    expect(allLinks.length).toBe(2);
  });
});
