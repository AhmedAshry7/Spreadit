import React from "react";
import { render, screen } from "@testing-library/react";
import CreateLeftHeader from "../CreateLeftHeader";

describe("CreateLeftHeader component", () => {
  test("renders header title correctly", () => {
    render(<CreateLeftHeader />);

    // Check if the header title is rendered
    const headerTitle = screen.getByText(/Create a post/i);
    expect(headerTitle).toBeInTheDocument();
  });
});
