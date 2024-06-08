import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RuleEntry from "../RuleEntry";

describe("RuleEntry component", () => {
  const mockProps = {
    title: "Test Rule",
    iteration: 1,
    description: "This is a test rule description.",
    lastEntry: false,
  };

  test("renders the component correctly with provided props", () => {
    render(<RuleEntry {...mockProps} />);

    expect(screen.getByText(`${mockProps.iteration}.`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.queryByText(mockProps.description)).not.toBeInTheDocument();
  });

  test("toggles the collapse state when title is clicked", () => {
    render(<RuleEntry {...mockProps} />);

    fireEvent.click(screen.getByText(mockProps.title));
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    fireEvent.click(screen.getByText(mockProps.title));
    expect(screen.queryByText(mockProps.description)).not.toBeInTheDocument();
  });
});
