import React from "react";
import { render } from "@testing-library/react";
import EmptyQueue from "../EmptyQueue";

describe("EmptyQueue component", () => {
  test("renders without crashing", () => {
    render(<EmptyQueue />);
  });

  test("renders the correct content", () => {
    const { getByText } = render(<EmptyQueue />);
    expect(getByText("The queue is clean!")).toBeInTheDocument();
    expect(getByText("Kitteh is pleased")).toBeInTheDocument();
  });
});
