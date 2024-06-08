jest.mock("../../assets/PP1.png", () => ({
  width: 100,
  heigth: 100,
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("../../../utils/getCookies", () => ({
  __esModule: true,
  default: async () => ({
    username: "testuser",
    access_token: "testtoken",
  }),
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileInfoModal from "../../post/ProfileInfoModal";

// Mock handler function
jest.mock("../../../utils/apiHandler", () => ({
  __esModule: true,
  default: async (url, method, body, token) => {
    if (url.includes("/users/isfollowed/")) {
      return { isFollowed: true };
    }
    if (url.includes("/users/follow")) {
      return { message: "Followed successfully" };
    }
    if (url.includes("/users/unfollow")) {
      return { message: "Unfollowed successfully" };
    }
    return {};
  },
}));

describe("The Profile Info Modal tests", () => {
  test("renders correctly when user is false", async () => {
    render(
      <ProfileInfoModal
        userName="testuser"
        isUser={false}
        profilePicture="../../assets/PP1.png"
        cakeDate="01/01/2022"
      />,
    );

    // Check for profile picture
    const profilePicture = screen.getByAltText("The profile picture");
    expect(profilePicture).toBeInTheDocument();

    // Check for user name
    const userName = screen.getByText("testuser");
    expect(userName).toBeInTheDocument();

    // Check for user description
    const userDescription = screen.getByText("u/testuser");
    expect(userDescription).toBeInTheDocument();

    // Check for cake icon
    const cakeIcon = screen.getByAltText("cake icon");
    expect(cakeIcon).toBeInTheDocument();

    // Check for cake date
    const cakeDate = screen.getByText("01/01/2022");
    expect(cakeDate).toBeInTheDocument();

    // Check for follow button
    const followButton = screen.getByText("Follow");
    expect(followButton).toBeInTheDocument();

    // Check for chat button
    const chatButton = screen.getByText("Chat");
    expect(chatButton).toBeInTheDocument();

    // Toggle follow
    fireEvent.click(followButton);
    await waitFor(() => {
      expect(screen.getByText("Unfollow")).toBeInTheDocument();
    });

    // Toggle unfollow
    fireEvent.click(screen.getByText("Unfollow"));
    await waitFor(() => {
      expect(screen.getByText("Follow")).toBeInTheDocument();
    });
  });

  test("renders correctly when user is true", async () => {
    // Mock isFollowed to return true
    /*     jest.mock('../../../utils/apiHandler', () => ({
      __esModule: true,
      default: async () => ({
        isFollowed: true,
      }),
    })); */

    render(
      <ProfileInfoModal
        userName="testuser"
        isUser={true}
        profilePicture="/../../assets/PP1.png"
        cakeDate="01/01/2022"
      />,
    );

    // Check for profile picture
    const profilePicture = screen.getByAltText("The profile picture");
    expect(profilePicture).toBeInTheDocument();

    // Check for user name
    const userName = screen.getByText("testuser");
    expect(userName).toBeInTheDocument();

    // Check for user description
    const userDescription = screen.getByText("u/testuser");
    expect(userDescription).toBeInTheDocument();

    // Check for cake icon
    const cakeIcon = screen.getByAltText("cake icon");
    expect(cakeIcon).toBeInTheDocument();

    // Check for cake date
    const cakeDate = screen.getByText("01/01/2022");
    expect(cakeDate).toBeInTheDocument();

    // Check for follow button
    const followButton = screen.queryByText("Follow");
    expect(followButton).not.toBeInTheDocument();

    // Check for chat button
    const chatButton = screen.queryByText("Chat");
    expect(chatButton).not.toBeInTheDocument();
  });
});
