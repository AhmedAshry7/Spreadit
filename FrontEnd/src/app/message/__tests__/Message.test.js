import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Message from "../Message";

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
    } else if (endPoint === `/message/unreadmsg/123456`) {
      return Promise.resolve([]);
    } else if (endPoint === `/message/readmsg/123456`) {
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

describe("Message component", () => {
  test("renders with provided props", () => {
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        incoming: true,
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, container } = render(
      <Message user={user} subject={subject} messages={messages} id={id} />,
    );

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

    expect(getByText(`u/${user}`)).toBeInTheDocument();
    expect(getByText(subject)).toBeInTheDocument();
    expect(getByText(messages[0].content)).toBeInTheDocument();
  });

  test("expands and collapses message content", () => {
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        incoming: true,
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, queryByText, container } = render(
      <Message user={user} subject={subject} messages={messages} id={id} />,
    );

    // Initially collapsed, content should not be visible
    expect(queryByText(messages[0].content)).not.toBeInTheDocument();

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

    // Content should be visible after expanding
    expect(getByText(messages[0].content)).toBeInTheDocument();

    // Find the "-" button within the div with the class "controls"
    const minusButton = container.querySelector(
      ".controls button:nth-child(2)",
    );

    // Click on the "-" button
    fireEvent.click(minusButton);

    // Content should not be visible after collapsing
    expect(queryByText(messages[0].content)).not.toBeInTheDocument();
  });

  test("Delete modal displayed when delete clicked", () => {
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        direction: "incoming",
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, getByAltText, queryByText, container } = render(
      <Message
        user={user}
        subject={subject}
        messages={messages}
        id={id}
        isRead={false}
      />,
    );

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

    // Find the "-" button within the div with the class "controls"
    const deleteButton = getByAltText("Delete");

    // Click on the delete button
    fireEvent.click(deleteButton);

    expect(getByText("Delete message?")).toBeInTheDocument();
  });

  test("displays report modal when report button is clicked", async () => {
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        direction: "incoming",
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, getByAltText, queryByText, container } = render(
      <Message
        user={user}
        subject={subject}
        messages={messages}
        id={id}
        isRead={false}
      />,
    );

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

    const reportButton = getByAltText("Report");

    fireEvent.click(reportButton);

    expect(getByText("Submit a report")).toBeInTheDocument();
  });

  test("displays comment input modal when reply button is clicked", async () => {
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        direction: "incoming",
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, getByAltText, queryByText, container } = render(
      <Message
        user={user}
        subject={subject}
        messages={messages}
        id={id}
        isRead={false}
      />,
    );

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

    const replyButton = getByAltText("reply");

    fireEvent.click(replyButton);

    expect(getByText("Reply")).toBeInTheDocument();
  });

  test("displays mark unread when isRead equal true", async () => {
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        direction: "incoming",
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, getByAltText, queryByText, container } = render(
      <Message
        user={user}
        subject={subject}
        messages={messages}
        id={id}
        isRead={true}
      />,
    );

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

    expect(getByAltText("mark unread")).toBeInTheDocument();
  });

  test("blocked button icon changes on click", async () => {
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        direction: "incoming",
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, getByAltText, queryByText, container } = render(
      <Message
        user={user}
        subject={subject}
        messages={messages}
        id={id}
        isRead={false}
      />,
    );

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

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
    const user = "example_user";
    const subject = "Example Subject";
    const messages = [
      {
        content: "Hello!",
        direction: "incoming",
        time: "2024-04-30T12:00:00Z",
        messageId: "123456",
      },
    ];
    const id = "789abc";

    const { getByText, getByAltText, queryByText, container } = render(
      <Message
        user={user}
        subject={subject}
        messages={messages}
        id={id}
        isRead={false}
      />,
    );

    // Find the "+" button within the div with the class "controls"
    const plusButton = container.querySelector(".controls button:first-child");

    // Click on the "+" button
    fireEvent.click(plusButton);

    const readButton = getByAltText("mark read");

    fireEvent.click(readButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(getByAltText("mark unread")).toBeInTheDocument();

    const unreadButton = getByAltText("mark unread");

    fireEvent.click(unreadButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(getByAltText("mark read")).toBeInTheDocument();
  });
});
