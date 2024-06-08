jest.mock("../../assets/PP1.png", () => ({
  width: 100,
  heigth: 100,
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToolBar from "../Toolbar";

jest.mock("../../../utils/getCookies", () => ({
  __esModule: true,
  default: async () => ({
    avatar: "../../assets/PP1.png",
  }),
}));

describe("The ToolBar component tests", () => {
  test("renders correctly when logged in", async () => {
    render(<ToolBar page="Home" loggedin={true} />);

    // Check for logo
    const logo = screen.getByAltText("Spreadit Logo");
    expect(logo).toBeInTheDocument();

    // Check for search icon
    const searchIcon = screen.getByAltText("search icon");
    expect(searchIcon).toBeInTheDocument();

    // Check for search input
    const searchInput = screen.getByPlaceholderText("search Home");
    expect(searchInput).toBeInTheDocument();

    // Check for chat icon
    const chatIcon = screen.getByAltText("chat icon");
    expect(chatIcon).toBeInTheDocument();

    // Check for create icon
    const createIcon = screen.getByAltText("create icon");
    expect(createIcon).toBeInTheDocument();

    // Check for notification icon
    const notificationIcon = screen.getByAltText("notification icon");
    expect(notificationIcon).toBeInTheDocument();

    // Check for profile picture
    const profilePicture = screen.getByAltText("profile picture");
    expect(profilePicture).toBeInTheDocument();

    fireEvent.click(profilePicture);
    // Check for View profile list item
    const viewProfile = screen.getByText("View profile");
    expect(viewProfile).toBeInTheDocument();

    // Check for Log out list item
    const logout = screen.getByText("Log out");
    expect(logout).toBeInTheDocument();

    // Check for Settings list item
    const settings = screen.getByText("Settings");
    expect(settings).toBeInTheDocument();
  });

  test("renders correctly when logged out", async () => {
    render(<ToolBar page="Home" loggedin={false} />);

    // Check for login button
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();

    // Check for logo
    const logo = screen.getByAltText("Spreadit Logo");
    expect(logo).toBeInTheDocument();

    // Check for search icon
    const searchIcon = screen.getByAltText("search icon");
    expect(searchIcon).toBeInTheDocument();

    // Check for search input
    const searchInput = screen.getByPlaceholderText("search Home");
    expect(searchInput).toBeInTheDocument();
  });
});
