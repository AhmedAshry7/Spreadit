import React from "react";
import { render } from "@testing-library/react";
import InboxBar from "../InboxBar";
import "@testing-library/jest-dom";

describe("InboxBar component", () => {
  it("renders all the tabs with their links correctly", () => {
    const { getByRole } = render(<InboxBar selected={0} />);

    expect(getByRole("link", { name: "All" })).toHaveAttribute(
      "href",
      "/message/inbox",
    );
    expect(getByRole("link", { name: "Unread" })).toHaveAttribute(
      "href",
      "/message/unread",
    );
    expect(getByRole("link", { name: "Messages" })).toHaveAttribute(
      "href",
      "/message/messages",
    );
    expect(getByRole("link", { name: "Post Replies" })).toHaveAttribute(
      "href",
      "/message/postreplies",
    );
    expect(getByRole("link", { name: "Username Mentions" })).toHaveAttribute(
      "href",
      "/message/mentions",
    );
  });

  it("renders with correct selected tab", () => {
    const { getByText } = render(<InboxBar selected={2} />);

    expect(getByText("All")).not.toHaveClass("selected");
    expect(getByText("Unread")).not.toHaveClass("selected");
    expect(getByText("Messages")).toHaveClass("selected");
    expect(getByText("Post Replies")).not.toHaveClass("selected");
    expect(getByText("Username Mentions")).not.toHaveClass("selected");
  });
});
