import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateLeftBox from "../CreateLeftBox";

describe("CreateLeftBox component", () => {
  test("renders correctly with default props", () => {
    render(
      <CreateLeftBox selectedOption="post" setSelectedOption={() => {}} />,
    );

    // Check if the main header is rendered
    const mainHeader = screen.getByText("Create a post");
    expect(mainHeader).toBeInTheDocument();

    // Check if the post option is selected by default
    const postOption = screen.getByText("Post");
    expect(postOption).toHaveClass("mainBoxHeaderSelected");

    // Check if other components are rendered based on default option
    const titleInput = screen.getByPlaceholderText("Title");
    expect(titleInput).toBeInTheDocument();

    // You can add more checks for other components here based on your default state
  });

  test("allows user to switch between options", () => {
    render(
      <CreateLeftBox selectedOption="link" setSelectedOption={() => {}} />,
    );

    // Click on the link option
    const linkOption = screen.getByText("Link");
    userEvent.click(linkOption);

    // Check if the link option is selected
    expect(linkOption).toHaveClass("mainBoxHeaderSelected");

    // You can add more checks here to verify that the correct components are rendered when different options are selected
  });

  // You can add more tests for other functionalities as needed
});
