import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DropdownCommunity from "../DropdownCommunity";

describe("DropdownCommunity", () => {
  const communityName = "testcommunity";
  const communityIcon = "https://example.com/icon.png";
  const communityMembers = 100;
  const setCommunity = jest.fn();

  test("renders community details correctly", () => {
    const { getByText, getByAltText } = render(
      <DropdownCommunity
        communityName={communityName}
        communityIcon={communityIcon}
        communityMembers={communityMembers}
        setCommunity={setCommunity}
      />,
    );

    const communityNameElement = getByText(`r/${communityName}`);
    const communityMembersElement = getByText(`${communityMembers} members`);
    const communityIconElement = getByAltText("Subreddit Icon");

    expect(communityNameElement).toBeInTheDocument();
    expect(communityMembersElement).toBeInTheDocument();
    expect(communityIconElement).toBeInTheDocument();
    expect(communityIconElement).toHaveAttribute("src", communityIcon);
  });

  test("calls setCommunity function when clicked", () => {
    const { getByRole } = render(
      <DropdownCommunity
        communityName={communityName}
        communityIcon={communityIcon}
        communityMembers={communityMembers}
        setCommunity={setCommunity}
      />,
    );

    const communityContainer = getByRole("link");
    fireEvent.click(communityContainer);

    expect(setCommunity).toHaveBeenCalledWith(communityName);
  });
});
