import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Bar from "../Bar";
import "@testing-library/jest-dom";

describe("Bar component", () => {
  it("renders all the tabs with their links correctly", () => {
    const { getByRole } = render(<Bar selected={0} />);

    expect(getByRole("link", { name: "Account" })).toHaveAttribute(
      "href",
      "/settings/account",
    );
    expect(getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/settings/profile",
    );
    expect(getByRole("link", { name: "Safety & Privacy" })).toHaveAttribute(
      "href",
      "/settings/privacy",
    );
    expect(getByRole("link", { name: "Feed settings" })).toHaveAttribute(
      "href",
      "/settings/feed",
    );
    expect(getByRole("link", { name: "Notifications" })).toHaveAttribute(
      "href",
      "/settings/notifications",
    );
    expect(getByRole("link", { name: "Emails" })).toHaveAttribute(
      "href",
      "/settings/emails",
    );
    expect(getByRole("link", { name: "Subscriptions" })).toHaveAttribute(
      "href",
      "/settings/premium",
    );
    expect(getByRole("link", { name: "Chat & Messaging" })).toHaveAttribute(
      "href",
      "/settings/messaging",
    );
  });

  it("renders with correct selected tab", () => {
    const { getByText } = render(<Bar selected={2} />);

    expect(getByText("Account")).not.toHaveClass("selected");
    expect(getByText("Safety & Privacy")).toHaveClass("selected");
    expect(getByText("Profile")).not.toHaveClass("selected");
  });
});
