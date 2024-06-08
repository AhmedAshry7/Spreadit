import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RulesRightSidebarItem from "../RulesRightSidebarItem";

describe("RulesRightSidebarItem Component", () => {
  const props = {
    key: 1,
    count: 1,
    title: "No Personal Attacks",
    description:
      "Personal attacks, insults, and bad faith criticism of other users are not tolerated.",
  };

  test("renders correctly", () => {
    render(<RulesRightSidebarItem {...props} />);

    //check if the title is rendered
    const titleElement = screen.getByText(props.title);
    expect(titleElement).toBeInTheDocument();

    //check if the description is initially hidden
    expect(screen.queryByText(props.description)).not.toBeInTheDocument();
  });

  test("toggles description visibility on click", () => {
    render(<RulesRightSidebarItem {...props} />);

    //click on the item to toggle description visibility
    fireEvent.click(screen.getByText(props.title));

    //check if the description is now visible
    const descriptionElement = screen.getByText(props.description);
    expect(descriptionElement).toBeInTheDocument();

    //click again to hide the description
    fireEvent.click(screen.getByText(props.title));

    //check if the description is hidden again
    expect(screen.queryByText(props.description)).not.toBeInTheDocument();
  });
});
