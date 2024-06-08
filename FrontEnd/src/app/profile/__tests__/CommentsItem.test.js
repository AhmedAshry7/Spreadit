import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CommentsItem from "@/app/profile/[username]/search/CommentsItem";

describe("CommentsItem component", () => {
  test("displays the subReddit information modal when hovering over the community name", async () => {
    const { getByText, getByAltText } = render(
      <CommentsItem
        nameone="Community"
        communitybanner="/community/banner.jpg"
        description="Description of the Community"
        nametwo="johnwilliam"
        commentoncomment="You should join my community!"
        comment="What community should I join?"
        urlone="/profile/community.jpg"
        urltwo="/profile/user.jpg"
        commentvotes={10}
        commentoncommentvotes={5}
        coccomment={3}
        key={1}
      />,
    );

    // Hover over the community name
    fireEvent.mouseEnter(getByText("r/Community"));

    // Assert that the subReddit information modal is displayed
    await waitFor(() => {
      expect(getByText("Description of the Community")).toBeInTheDocument();
    });
  });

  // Similar tests can be written for user name hover and mouse leave functionality

  // Test the component with different props
});
