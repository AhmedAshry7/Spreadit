import React from "react";
import { getByRole, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../Signup";
import "@testing-library/jest-dom";

describe("Signup component", () => {
  it("renders Component without children correctly", () => {
    const { getAllByRole } = render(<Signup />);
    const allLinks = getAllByRole("link");
    expect(allLinks.length).toBe(1);
  });
});
