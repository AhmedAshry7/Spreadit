import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Community from "../Community";

describe("Community component", () => {
  test("renders the component correctly", () => {
    const communityName = "aww";
    const { getByText } = render(<Community communityName={communityName} />);
    expect(getByText(`r/${communityName}`)).toBeInTheDocument();
  });

  jest.mock("next/router", () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));

  test("renders community name", () => {
    render(<Community communityName="aww" />);
    const communityNameElement = screen.getByText("r/aww");
    expect(communityNameElement).toBeInTheDocument();
  });

  test("clicking create post button should navigate to submit page", () => {
    const pushMock = jest.fn();
    jest.mock("next/router", () => ({
      useRouter: () => ({
        push: pushMock,
      }),
    }));

    render(<Community communityName="aww" />);
    const createPostButton = screen.getByText("Create a Post");
    fireEvent.click(createPostButton);
    expect(pushMock).toHaveBeenCalledWith("/submit");
  });

  test("joining and leaving community", () => {
    render(<Community communityName="aww" />);
    const joinButton = screen.getByText("Join");
    fireEvent.click(joinButton);
    const joinedButton = screen.getByText("Joined");
    expect(joinedButton).toBeInTheDocument();

    fireEvent.click(joinedButton);
    const joinAgainButton = screen.getByText("Join");
    expect(joinAgainButton).toBeInTheDocument();
  });

  test("renders community name", () => {
    render(<Community communityName="aww" />);
    const communityNameElement = screen.getByText("r/aww");
    expect(communityNameElement).toBeInTheDocument();
  });

  test("clicking create post button should navigate to submit page", () => {
    const pushMock = jest.fn();
    jest.mock("next/router", () => ({
      useRouter: () => ({
        push: pushMock,
      }),
    }));

    render(<Community communityName="aww" />);
    const createPostButton = screen.getByText("Create a Post");
    fireEvent.click(createPostButton);
    expect(pushMock).toHaveBeenCalledWith("/submit");
  });

  test("joining and leaving community", async () => {
    render(<Community communityName="aww" />);
    const joinButton = screen.getByText("Join");
    fireEvent.click(joinButton);
    await waitFor(() => {
      const joinedButton = screen.getByText("Joined");
      expect(joinedButton).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Joined"));
    await waitFor(() => {
      const joinAgainButton = screen.getByText("Join");
      expect(joinAgainButton).toBeInTheDocument();
    });
  });

  test("adding and removing community from favorites", async () => {
    render(<Community communityName="aww" />);
    const addToFavoritesButton = screen.getByText("Add to Favorites");
    fireEvent.click(addToFavoritesButton);
    await waitFor(() => {
      const removedFromFavoritesButton = screen.getByText(
        "Removed from Favorites",
      );
      expect(removedFromFavoritesButton).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Removed from Favorites"));
    await waitFor(() => {
      const addToFavoritesAgainButton = screen.getByText("Add to Favorites");
      expect(addToFavoritesAgainButton).toBeInTheDocument();
    });
  });

  test("muting and unmuting community", async () => {
    render(<Community communityName="aww" />);
    const muteButton = screen.getByText("Mute");
    fireEvent.click(muteButton);
    await waitFor(() => {
      const unmuteButton = screen.getByText("Unmute");
      expect(unmuteButton).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Unmute"));
    await waitFor(() => {
      const muteButtonAgain = screen.getByText("Mute");
      expect(muteButtonAgain).toBeInTheDocument();
    });
  });
});
