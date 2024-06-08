import React from "react";
import { render, fireEvent } from "@testing-library/react";
import QueuedPost from "../QueuedPost";

describe("QueuedPost component", () => {
  const testProps = {
    communityName: "announcements",
    username: "TestUser",
    time: "99 hours ago",
    title: "Test Title",
    commentCount: 1,
    voteCount: 43,
    postId: 12,
    reports: 0,
    removeFunction: jest.fn(),
    approveFunction: jest.fn(),
  };

  test("renders without crashing", () => {
    render(<QueuedPost {...testProps} />);
  });

  test("renders the correct content", () => {
    const { getByText, getByTestId } = render(<QueuedPost {...testProps} />);

    expect(getByText(testProps.communityName)).toBeInTheDocument();
    expect(getByText(`u/${testProps.username}`)).toBeInTheDocument();
    expect(getByText(testProps.time)).toBeInTheDocument();
    expect(getByText(testProps.title)).toBeInTheDocument();
    expect(getByText(`${testProps.commentCount} comment`)).toBeInTheDocument();
    expect(getByText(`${testProps.voteCount}`)).toBeInTheDocument();
    expect(getByText(`Approve`)).toBeInTheDocument();
    expect(getByText(`Remove`)).toBeInTheDocument();
  });

  test("calls approveFunction when approve button is clicked", () => {
    const { getByText } = render(<QueuedPost {...testProps} />);

    fireEvent.click(getByText("Approve"));

    expect(testProps.approveFunction).toHaveBeenCalled();
  });
});
