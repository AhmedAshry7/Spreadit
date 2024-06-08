import React from "react";
import { render, fireEvent, getByRole } from "@testing-library/react";
import Post from "../Post";

jest.mock("../../../utils/getCookies", () => ({
  __esModule: true,
  default: async () => ({
    username: "testuser",
    access_token: "testtoken",
  }),
}));

jest.mock("../../../utils/apiHandler", () => ({
  __esModule: true,
  default: jest.fn((endPoint, Method, Body, token) => {
    if (endPoint === `/community/moderation/example/testuser/is-moderator`) {
      return Promise.resolve({ isModerator: false });
    }
    // Handle other cases if needed
  }),
}));

jest.mock("../../../utils/timeDifference", () => {
  return jest.fn().mockReturnValue("mock time difference");
});

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Post component", () => {
  let samplePost = {
    postId: "123",
    title: "Test Post",
    description: "This is a test post",
    userName: "testUser",
    subRedditName: "example",
    subRedditPicture: "/example.jpg",
    attachments: [],
    upVotes: 10,
    upVoteStatus: 1,
    comments: 5,
    time: "2024-04-15T12:00:00Z",
    isProfile: false,
    cakeDate: "2024-01-01T12:00:00Z",
    isFollowed: true,
    isMember: true,
    isSpoiler: false,
    isNSFW: false,
    isSaved: false,
    sendReplyNotifications: true,
    pollIsOpen: false,
    pollOptions: [],
    pollExpiration: "",
    pollVote: "",
  };

  it("renders a post with no attachments", () => {
    const { getByAltText, getByText, queryByText } = render(
      <Post {...samplePost} />,
    );
    expect(getByText("Test Post")).toBeInTheDocument();
    expect(queryByText("This is a test post")).toBeInTheDocument();
  });

  it("renders a post with an image so the description isn't visible", () => {
    samplePost.attachments = [
      { type: "image", link: "https://www.image.com.jpg" },
    ];
    const { getByAltText, getByText, queryByText } = render(
      <Post {...samplePost} />,
    );
    expect(getByText("Test Post")).toBeInTheDocument();
    expect(queryByText("This is a test post")).not.toBeInTheDocument();
  });

  it("displays next image arrow but not previous image arrow when at first image", () => {
    samplePost.attachments = [
      { type: "image", link: "https://www.image.com.jpg" },
      { type: "image", link: "https://www.image.com.jpg" },
    ];
    const { getByAltText, getByText, queryByText, queryAllByAltText } = render(
      <Post {...samplePost} />,
    );
    expect(getByAltText("next image")).toBeInTheDocument();
    expect(queryAllByAltText("previous image").length).toBe(0);
  });

  it("When next image is pressed and post only has 2 images next disappears and previous appears", () => {
    samplePost.attachments = [
      { type: "image", link: "https://www.image.com.jpg" },
      { type: "image", link: "https://www.image.com.jpg" },
    ];
    const { getByAltText, getByText, queryByText, queryAllByAltText } = render(
      <Post {...samplePost} />,
    );
    expect(getByAltText("next image")).toBeInTheDocument();
    expect(queryAllByAltText("previous image").length).toBe(0);
    const nextButton = getByAltText("next image").closest("button");
    fireEvent.click(nextButton);
    expect(queryAllByAltText("next image").length).toBe(0);
    expect(queryAllByAltText("previous image").length).toBe(1);
  });

  it("image changes when next image is clicked", () => {
    samplePost.attachments = [
      { type: "image", link: "https://www.image1.com.jpg" },
      { type: "image", link: "https://www.image2.com.jpg" },
    ];
    const { getByAltText, getByText, queryByText, queryAllByAltText } = render(
      <Post {...samplePost} />,
    );
    expect(getByAltText("next image")).toBeInTheDocument();
    expect(queryAllByAltText("previous image").length).toBe(0);
    const nextButton = getByAltText("next image").closest("button");

    let imgElement = getByAltText("posted image"); // Assuming 'posted image' is the alt text
    let src = imgElement.getAttribute("src");
    expect(src).toEqual(expect.stringMatching(/image1\.com\.jpg/));

    fireEvent.click(nextButton);

    imgElement = getByAltText("posted image");
    src = imgElement.getAttribute("src");
    expect(src).toEqual(expect.stringMatching(/image2\.com\.jpg/));
  });

  it("prioritises the video over the image", () => {
    samplePost.attachments = [
      { type: "video", link: "https://www.video.com.mp4" },
      { type: "image", link: "https://www.image.com.jpg" },
    ];
    const {
      getByAltText,
      getByText,
      queryByText,
      queryAllByAltText,
      container,
    } = render(<Post {...samplePost} />);
    expect(queryAllByAltText("posted image").length).toBe(0);
    const iframeElement = container.querySelector("iframe");

    expect(iframeElement).toBeInTheDocument();
  });

  it("fullscreens the image when clicked then returns to normal when fullscreen is exited", () => {
    samplePost.attachments = [
      { type: "image", link: "https://www.image1.com.jpg" },
      { type: "image", link: "https://www.image2.com.jpg" },
    ];
    const { getByAltText, getByText, queryByText, queryAllByAltText } = render(
      <Post {...samplePost} />,
    );

    expect(queryAllByAltText("exit full screen").length).toBe(0);

    const imageDiv = getByAltText("posted image").closest("div");

    fireEvent.click(imageDiv);

    expect(queryAllByAltText("exit full screen").length).toBe(1);

    const exitFullscreen = getByAltText("exit full screen").closest("button");

    fireEvent.click(exitFullscreen);

    expect(queryAllByAltText("exit full screen").length).toBe(0);
  });
});
