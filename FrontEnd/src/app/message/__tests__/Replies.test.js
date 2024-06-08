import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Reply from "../Replies";

jest.mock("../../utils/getCookies", () => ({
  __esModule: true,
  default: async () => ({
    username: "testuser",
    access_token: "testtoken",
  }),
}));

jest.mock("../../utils/apiHandler", () => ({
  __esModule: true,
  default: jest.fn((endPoint, Method, Body, token) => {
    if (endPoint === `/users/block`) {
      return Promise.resolve("blocked");
    } else if (endPoint === `/users/unblock`) {
      return Promise.resolve("user unblocked");
    } else if (endPoint === `/message/unreadmsg/123abc`) {
      return Promise.resolve([]);
    } else if (endPoint === `/message/readmsg/123abc`) {
      return Promise.resolve([]);
    } else if (endPoint === `/comments/1/upvote`) {
      return Promise.resolve("upvoted");
    } else if (endPoint === `/comments/1/downvote`) {
      return Promise.resolve("downvoted");
    }
    // Handle other cases if needed
  }),
}));

jest.mock("../../utils/timeDifference", () => {
  return jest.fn().mockReturnValue("mock time difference");
});

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Reply component", () => {
  test("renders with provided props", async () => {
    const { getByText } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
      />,
    );

    // Ensure that the component renders without errors
    expect(getByText("Reply content")).toBeInTheDocument();
    expect(getByText("u/example_user")).toBeInTheDocument();
    expect(getByText("r/example_subreddit")).toBeInTheDocument();
  });

  test("displays report modal when report button is clicked", async () => {
    const { getByAltText, getByText } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
      />,
    );

    const reportButton = getByAltText("Report");

    fireEvent.click(reportButton);

    expect(getByText("Submit a report")).toBeInTheDocument();
  });

  test("displays comment input modal when reply button is clicked", async () => {
    const { getByAltText, getByText } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
      />,
    );

    const replyButton = getByAltText("reply");

    fireEvent.click(replyButton);

    expect(getByText("comment")).toBeInTheDocument();
  });

  test("blocked button icon changes on click", async () => {
    const { getByAltText, getByText } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
        isRead={true}
      />,
    );

    const blockButton = getByAltText("Block");

    fireEvent.click(blockButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(getByAltText("Unblock")).toBeInTheDocument();

    const UnblockButton = getByAltText("Unblock");

    fireEvent.click(UnblockButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(getByAltText("Block")).toBeInTheDocument();
  });

  test("read button icon changes on click", async () => {
    const { getByAltText, getByText } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
        isRead={false}
      />,
    );

    const readButton = getByAltText("mark read");

    fireEvent.click(readButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(getByAltText("mark unread")).toBeInTheDocument();

    const unreadButton = getByAltText("mark unread");

    fireEvent.click(unreadButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(getByAltText("mark read")).toBeInTheDocument();
  });

  test("displays mark unread when isRead equal true", async () => {
    const { getByAltText, getByText } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
        isRead={true}
      />,
    );

    expect(getByAltText("mark unread")).toBeInTheDocument();
  });

  test("upvote button has type upvoted if voteStatus is upvoted", async () => {
    const { getByAltText, getByText, container } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
        isRead={true}
        voteStatus="upvoted"
      />,
    );

    const buttons = container.querySelectorAll("button");

    const firstButton = buttons[0];

    const lastButton = buttons[buttons.length - 1];

    expect(firstButton).toHaveClass("upvoted");

    expect(lastButton).toHaveClass("upvoted");

    expect(firstButton).not.toHaveClass("downvoted");

    expect(lastButton).not.toHaveClass("downvoted");
  });

  test("button type chnages according to which is pressed upvote or downvote", async () => {
    const { getByAltText, getByText, container } = render(
      <Reply
        id="123abc"
        user="example_user"
        subReddit="example_subreddit"
        post="Example Post Content"
        reply="Reply content"
        replyMedia=""
        isRead={true}
        voteStatus="neutral"
      />,
    );

    const buttons = container.querySelectorAll("button");

    const firstButton = buttons[0];

    const lastButton = buttons[buttons.length - 1];

    expect(firstButton).toHaveClass("neutral");

    expect(lastButton).toHaveClass("neutral");

    expect(firstButton).not.toHaveClass("upvoted");

    expect(lastButton).not.toHaveClass("upvoted");

    fireEvent.click(firstButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(firstButton).toHaveClass("upvoted");

    expect(lastButton).toHaveClass("upvoted");

    expect(firstButton).not.toHaveClass("neutral");

    expect(lastButton).not.toHaveClass("neutral");

    fireEvent.click(lastButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(firstButton).toHaveClass("downvoted");

    expect(lastButton).toHaveClass("downvoted");

    expect(firstButton).not.toHaveClass("neutral");

    expect(lastButton).not.toHaveClass("neutral");
  });
});
