import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommunityRulesBox from "../CommunityRulesBox";

describe("CommunityRulesBox component", () => {
  const mockProps = {
    community: "testCom",
    rules: [
      {
        title: "Rule Number 1",
        description: "Rule Number 1 Description",
        reportReason: "Shouldn't need this",
      },
      {
        title: "Rule Number 2",
        description: "Rule Number 2 Description",
        reportReason: "Shouldn't need this",
      },
      {
        title: "Rule Number 3",
        description: "Rule Number 3 Description",
        reportReason: "Shouldn't need this",
      },
      {
        title: "Rule Number 4",
        description: "Rule Number 4 Description",
        reportReason: "Shouldn't need this",
      },
    ],
  };

  test("renders the component correctly", () => {
    render(<CommunityRulesBox {...mockProps} />);

    expect(screen.getByText("testCom Rules")).toBeInTheDocument();
    expect(screen.getByText("Rule Number 1")).toBeInTheDocument();
    expect(screen.getByText("Rule Number 2")).toBeInTheDocument();
    expect(screen.getByText("Rule Number 3")).toBeInTheDocument();
    expect(screen.getByText("Rule Number 4")).toBeInTheDocument();
  });

  test("expands a rule and displays its description", () => {
    render(<CommunityRulesBox {...mockProps} />);

    const expandButton = screen.getByText("Rule Number 1");
    fireEvent.click(expandButton);

    const expandedDescription = screen.getByText("Rule Number 1 Description");
    expect(expandedDescription).toBeInTheDocument();
  });
});
