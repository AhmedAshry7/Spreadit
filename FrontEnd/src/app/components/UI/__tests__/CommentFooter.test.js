import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentFooter from "../CommentFooter";

describe("CommentFooter component", () => {
  const mockProps = {
    upvote: jest.fn(),
    downvote: jest.fn(),
    onSave: jest.fn(),
    onEdit: jest.fn(),
    onReply: jest.fn(),
    onHide: jest.fn(),
    onDelete: jest.fn(),
    onReport: jest.fn(),
    onBlock: jest.fn(),
    voteCount: 10,
    voteStatus: "neutral",
    isSaved: false,
    isUser: false,
    userName: "testUser",
    subRedditPicture: "subRedditPicture",
    subRedditName: "subRedditName",
    subRedditRules: [],
  };
  const mockProps2 = {
    upvote: jest.fn(),
    downvote: jest.fn(),
    onSave: jest.fn(),
    onEdit: jest.fn(),
    onReply: jest.fn(),
    onHide: jest.fn(),
    onDelete: jest.fn(),
    onReport: jest.fn(),
    onBlock: jest.fn(),
    voteCount: 10,
    voteStatus: "neutral",
    isSaved: true,
    isUser: false,
    userName: "testUser",
    subRedditPicture: "subRedditPicture",
    subRedditName: "subRedditName",
    subRedditRules: [],
  };
  const mockProps3 = {
    upvote: jest.fn(),
    downvote: jest.fn(),
    onSave: jest.fn(),
    onEdit: jest.fn(),
    onReply: jest.fn(),
    onHide: jest.fn(),
    onDelete: jest.fn(),
    onReport: jest.fn(),
    onBlock: jest.fn(),
    voteCount: 10,
    voteStatus: "neutral",
    isSaved: false,
    isUser: true,
    userName: "testUser",
    subRedditPicture: "subRedditPicture",
    subRedditName: "subRedditName",
    subRedditRules: [],
  };

  test("renders the component correctly", () => {
    render(<CommentFooter {...mockProps} />);

    expect(screen.getByAltText("Upvote arrow")).toBeInTheDocument();
    expect(screen.getByAltText("Downvote arrow")).toBeInTheDocument();
    expect(screen.getByAltText("Comments Icon")).toBeInTheDocument();
    expect(screen.getByAltText("Share Icon")).toBeInTheDocument();
    expect(screen.getByAltText("options Icon")).toBeInTheDocument();
  });

  test("handles upvote click correctly", () => {
    render(<CommentFooter {...mockProps} />);

    const upvoteButton = screen.getByAltText("Upvote arrow");
    fireEvent.click(upvoteButton);

    expect(mockProps.upvote).toHaveBeenCalledTimes(1);
  });

  test("handles downvote click correctly", () => {
    render(<CommentFooter {...mockProps} />);

    const downvoteButton = screen.getByAltText("Downvote arrow");
    fireEvent.click(downvoteButton);

    expect(mockProps.downvote).toHaveBeenCalledTimes(1);
  });

  test("handles reply click correctly", () => {
    render(<CommentFooter {...mockProps} />);

    const replyButton = screen.getByText("Reply");
    fireEvent.click(replyButton);

    expect(mockProps.onReply).toHaveBeenCalledTimes(1);
  });

  test("handles share click correctly", () => {
    render(<CommentFooter {...mockProps} />);

    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    // Add your share logic or function here
  });

  test("toggles dropdown correctly saved and user is false", () => {
    render(<CommentFooter {...mockProps} />);

    const toggleButton = screen.getByAltText("options Icon");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Report")).toBeInTheDocument();
    expect(screen.getByText("Hide")).toBeInTheDocument();
    expect(screen.queryByText("Remove from saved")).not.toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  test("toggles dropdown correctly saved is true and user is false", () => {
    render(<CommentFooter {...mockProps2} />);

    const toggleButton = screen.getByAltText("options Icon");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Remove from saved")).toBeInTheDocument();
    expect(screen.getByText("Report")).toBeInTheDocument();
    expect(screen.getByText("Hide")).toBeInTheDocument();
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  test("toggles dropdown correctly saved is false and user is true", () => {
    render(<CommentFooter {...mockProps3} />);

    const toggleButton = screen.getByAltText("options Icon");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Hide")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.queryByText("Remove from saved")).not.toBeInTheDocument();
    expect(screen.queryByText("Report")).not.toBeInTheDocument();
  });
});
