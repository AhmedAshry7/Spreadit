import React from "react";
import { render, screen } from "@testing-library/react";
import CreateRightRules from "../CreateRightRules";

describe("CreateRightRules component", () => {
  test("renders rules header and content", () => {
    render(<CreateRightRules />);

    const headerText = screen.getByText(`Posting to Spreadit`);
    expect(headerText).toBeInTheDocument();

    const rules = screen.getAllByRole("listitem");
    expect(rules).toHaveLength(5);
  });
});
