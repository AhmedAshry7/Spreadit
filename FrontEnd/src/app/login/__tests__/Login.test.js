import React from "react";
import { getByRole, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
import "@testing-library/jest-dom";

describe("Login component", () => {
  it("should render a checkbox", () => {
    const { getByRole } = render(<Login />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("renders Component without children correctly", () => {
    const { getAllByRole } = render(<Login />);
    const allLinks = getAllByRole("link");
    expect(allLinks.length).toBe(3);
  });
});
