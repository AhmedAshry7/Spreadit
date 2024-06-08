import React from "react";
import { render } from "@testing-library/react";
import CommunityItem from "../CommunityItem";

describe("CommunityItem component", () => {
  test("renders the component with initial state", () => {
    const { getByText, getByAltText } = render(
      <CommunityItem
        name="Community"
        members={1000}
        url="/community/profile.jpg"
        description="This is a description of the community."
        key="1"
      />,
    );

    expect(getByText("r/Community")).toBeInTheDocument();
    expect(getByText("1000 members")).toBeInTheDocument();
    expect(
      getByText("This is a description of the community."),
    ).toBeInTheDocument();
    expect(getByAltText("profile icon")).toBeInTheDocument();
  });
});
