import React from "react";
import { render, screen } from "@testing-library/react";
import CommunityInfoBox from "../CommunityInfoBox";

describe("CommunityInfoBox component", () => {
  const mockProps = {
    title: "testCom",
    description: "testDesc",
    iconurl: "test-icon-url",
    bannerurl: "test-banner-url",
    membercount: 100,
    datecreated: "testDate",
  };

  test("renders the component correctly", () => {
    render(<CommunityInfoBox {...mockProps} />);

    expect(screen.getByAltText("Subreddit Icon")).toBeInTheDocument();
    expect(screen.getByTestId("no-edit-description-block")).toBeInTheDocument();
    expect(
      screen.getByText(`Created ${mockProps.datecreated}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return content.startsWith(`${mockProps.membercount}`);
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  test("renders the title and description", () => {
    render(<CommunityInfoBox {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  test("renders the subreddit icon", () => {
    render(<CommunityInfoBox {...mockProps} />);

    expect(screen.getByAltText("Subreddit Icon")).toHaveAttribute(
      "src",
      mockProps.iconurl,
    );
  });

  test("renders the banner image", () => {
    render(<CommunityInfoBox {...mockProps} />);

    expect(screen.getByTestId("no-edit-description-block")).toHaveStyle(
      `backgroundImage: ${mockProps.bannerurl}`,
    );
  });
});
