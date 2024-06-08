import React from "react";
import { render } from "@testing-library/react";
import PostsItem from "@/app/community/[communityName]/search/PostsItem";
import awwpfp from "@/app/assets/blueProfile.jpeg";

describe("PostsItem component", () => {
  test("renders the component with initial state", () => {
    const { getByText, getByAltText } = render(
      <PostsItem
        name="aww"
        title="Thisisacutecat!"
        url={awwpfp}
        banner={awwpfp}
        votes={10}
        comments={5}
        description="Postyourpets"
        key="1"
      />,
    );
    expect(getByText("r/aww")).toBeInTheDocument();
  });
});
