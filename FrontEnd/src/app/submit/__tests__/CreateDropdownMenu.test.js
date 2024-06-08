import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateDropdownMenu from "../CreateDropdownMenu";

describe("CreateDropdownMenu component", () => {
  jest.mock("next/router", () => ({
    useRouter: jest.fn().mockReturnValue({}),
  }));

  const mockCommunities = [
    { name: "Community 1", membersCount: 100 },
    { name: "Community 2", membersCount: 200 },
  ];

  test("renders the component correctly", () => {
    render(<CreateDropdownMenu communities={mockCommunities} />);

    expect(screen.getByText("Your profile")).toBeInTheDocument();
    expect(screen.getByText("Your communities")).toBeInTheDocument();
  });

  test("displays user profile information", () => {
    const userName = "Testing";
    const userIcon =
      "https://styles.redditmedia.com/t5_7r9ed6/styles/profileIcon_ljpm97v13fpc1.jpg";

    render(
      <CreateDropdownMenu
        userName={userName}
        userIcon={userIcon}
        communities={mockCommunities}
      />,
    );

    expect(screen.getByAltText("User avatar")).toHaveAttribute(
      "src",
      `${{ userIcon }}`,
    );
    expect(screen.getByText(`u/${userName}`)).toBeInTheDocument();
  });

  test("renders user communities", () => {
    render(<CreateDropdownMenu communities={mockCommunities} />);

    expect(
      screen.getByText(`r/${mockCommunities[0].name}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCommunities[0].membersCount} members`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`r/${mockCommunities[1].name}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockCommunities[1].membersCount} members`),
    ).toBeInTheDocument();
  });

  test('displays modal when "Create New" button is clicked', () => {
    render(<CreateDropdownMenu communities={mockCommunities} />);

    const createButton = screen.getByText("Create New");
    fireEvent.click(createButton);

    expect(screen.getByText("Create a community")).toBeInTheDocument();
  });
});
