import React from "react";
import { render } from "@testing-library/react";
import NoScheduled from "../NoScheduled";

describe("NoScheduled component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<NoScheduled />);
    expect(
      getByText("No scheduled posts in announcements"),
    ).toBeInTheDocument();
    expect(getByText("Schedule post")).toBeInTheDocument();
  });

  it("renders correctly with custom community name", () => {
    const { getByText } = render(
      <NoScheduled communityName="customCommunity" />,
    );
    expect(
      getByText("No scheduled posts in customCommunity"),
    ).toBeInTheDocument();
    expect(getByText("Schedule post")).toBeInTheDocument();
  });

  it("renders a link to the submit page", () => {
    const { getByText } = render(<NoScheduled />);
    const scheduleLink = getByText("Schedule post");
    expect(scheduleLink).toBeInTheDocument();
    expect(scheduleLink.href).toMatch("/submit");
  });
});
