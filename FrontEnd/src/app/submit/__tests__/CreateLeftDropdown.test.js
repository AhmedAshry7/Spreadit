import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateLeftDropdown from "../CreateLeftDropdown";

describe("CreateLeftDropdown component", () => {
  test("renders dropdown menu correctly", () => {
    // Mock the subscribed communities data
    const mockCommunities = ["Community 1", "Community 2", "Community 3"];

    // Render the component with mock data
    render(<CreateLeftDropdown current="" setter={() => {}} />);

    // Find the input field for community selection
    const inputField = screen.getByPlaceholderText(/Choose a community/i);
    expect(inputField).toBeInTheDocument();

    // Simulate a click event on the input field to toggle the menu visibility
    fireEvent.click(inputField);

    // Check if the dropdown menu is visible
    const dropdownMenu = screen.getByTestId("dropdown-menu");
    expect(dropdownMenu).toBeInTheDocument();

    // Check if the communities are rendered in the dropdown menu
    mockCommunities.forEach((community) => {
      const communityOption = screen.getByText(community);
      expect(communityOption).toBeInTheDocument();
    });
  });
});
