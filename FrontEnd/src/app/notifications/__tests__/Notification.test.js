import { render } from "@testing-library/react";
import Notification from "../Notification";
import * as router from "next/router";

// Mocking the useRouter hook from next/router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

// Mocking the handler function
jest.mock("../../utils/apiHandler", () => jest.fn());

// Mocking the getCookies function
jest.mock("../../utils/getCookies", () => ({
  __esModule: true,
  default: async () => ({
    username: "testuser",
    access_token: "testtoken",
  }),
}));

describe("Notification", () => {
  // Setup common props here if needed
  const props = {
    id: "123abc",
    type: "postReply",
    user: {
      username: "example_user",
      avatarUrl: "https://example_avatar_url.jpeg",
    },
    subReddit: "example_subreddit",
    content: "Example notification content",
    time: "2024-04-30T12:00:00Z",
    unread: true,
    postId: "456def",
  };

  it("renders correctly", () => {
    const { getByText } = render(<Notification {...props} />);
    expect(
      getByText(/replied to your post in r\/example_subreddit/),
    ).toBeInTheDocument();
  });

  const props2 = {
    id: "123abc",
    type: "postUpvote",
    user: {
      username: "example_user",
      avatarUrl: "https://example_avatar_url.jpeg",
    },
    subReddit: "example_subreddit",
    content: "",
    time: "2024-04-30T12:00:00Z",
    unread: true,
    postId: "456def",
  };

  it("includes correct options", () => {
    const { getByText } = render(<Notification {...props2} />);
    expect(
      getByText("Disable updates from this community"),
    ).toBeInTheDocument();
  });
});
