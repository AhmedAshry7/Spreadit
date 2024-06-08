import React from "react";
import { render } from "@testing-library/react";
import ScheduledCard from "../ScheduledCard";

describe("ScheduledCard component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(<ScheduledCard />);
    expect(getByText("This post is scheduled for")).toBeInTheDocument();
    expect(getByText("TestPost")).toBeInTheDocument();
    expect(getByText("Scheduled by")).toBeInTheDocument();
    expect(getByText("1970 January 1st")).toBeInTheDocument();
    expect(getByText("announcements")).toBeInTheDocument();
  });

  it("renders correctly with custom props", () => {
    const { getByText } = render(
      <ScheduledCard
        communityName="customCommunity"
        post="CustomPost"
        username="CustomUser"
        date="2024 April 30th"
      />,
    );
    expect(getByText("This post is scheduled for")).toBeInTheDocument();
    expect(getByText("CustomPost")).toBeInTheDocument();
    expect(getByText("Scheduled by")).toBeInTheDocument();
    expect(getByText("2024 April 30th")).toBeInTheDocument();
    expect(getByText("customCommunity")).toBeInTheDocument();
  });
});
