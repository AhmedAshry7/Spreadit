jest.mock("../../assets/PP1.png", () => ({
  width: 100,
  heigth: 100,
}));
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Comment from "../Comment";
import apiHandler from "../../../utils/apiHandler";

jest.mock("../../../utils/getCookies", () => ({
  __esModule: true,
  default: async () => ({
    username: "testuser",
    access_token: "testtoken",
  }),
}));

jest.mock("../../../utils/apiHandler");

describe("The Comment component tests", () => {
  const mockComment = {
    id: "1",
    user: {
      username: "User 1",
      avatar_url: "../../assets/PP1.png",
      created_at: "2022-10-12",
    },
    content: "Test Comment",
    replies: [],
    is_hidden: false,
    is_saved: false,
    is_upvoted: false,
    is_downvoted: false,
    likes_count: 0,
    media: [
      {
        link: "../../assets/PP1.png",
      },
    ],
    created_at: "2024-05-0y",
  };

  const mockProps = {
    comment: mockComment,
    subRedditName: "testSubreddit",
    subRedditPicture: "../../assets/PP1.png",
    subRedditRules: [
      {
        title: "Rule 1",
        description: "Description for Rule 1",
      },
      {
        title: "Rule 2",
        description: "Description for Rule 2",
      },
    ],
  };

  beforeEach(() => {
    apiHandler.mockClear();
  });

  it("renders a comment correctly", () => {
    render(<Comment {...mockProps} />);

    expect(screen.getByText(mockComment.content)).toBeInTheDocument();
    expect(
      screen.getByText(`u/${mockComment.user.username}`),
    ).toBeInTheDocument();
  });

  it("handles upvoting correctly", async () => {
    render(<Comment {...mockProps} />);

    const upvoteButton = screen.getByAltText("Upvote arrow");
    fireEvent.click(upvoteButton);

    await waitFor(() =>
      expect(apiHandler).toHaveBeenCalledWith(
        `/comments/${mockComment.id}/upvote`,
        "POST",
        "",
        null,
      ),
    );
  });

  it("handles downvoting correctly", async () => {
    render(<Comment {...mockProps} />);

    const downvoteButton = screen.getByAltText("Downvote arrow");
    fireEvent.click(downvoteButton);

    await waitFor(() =>
      expect(apiHandler).toHaveBeenCalledWith(
        `/comments/${mockComment.id}/downvote`,
        "POST",
        "",
        null,
      ),
    );
  });

  it("handles replying correctly", () => {
    render(<Comment {...mockProps} />);

    const replyButton = screen.getByAltText("Comments Icon");
    fireEvent.click(replyButton);
  });

  it("handles reporting correctly", async () => {
    render(<Comment {...mockProps} />);

    const reportButton = screen.getByText("Report"); // You can replace 'edit' with the actual text or element for editing
    fireEvent.click(reportButton);
    expect(screen.getByText("Submit a report")).toBeInTheDocument();
  });
  it("handles reporting correctly", async () => {
    render(<Comment {...mockProps} />);

    const hideButton = screen.getByText("Hide"); // You can replace 'edit' with the actual text or element for editing
    fireEvent.click(hideButton);
    await waitFor(() =>
      expect(apiHandler).toHaveBeenCalledWith(
        `/comments/${mockComment.id}/hide`,
        "POST",
        "",
        null,
      ),
    );
    expect(screen.queryByText("mockComment.content")).not.toBeInTheDocument();
    expect(screen.getByText("undo")).toBeInTheDocument();
  });
});
