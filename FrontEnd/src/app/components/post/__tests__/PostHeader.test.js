import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import PostHeader from "../PostHeader";

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
    if (endPoint === `/community/testSubReddit/get-info`) {
      return Promise.resolve({
        description: "description",
        communityBanner: "/testPicture.jpg",
        rules: [],
      });
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

describe("PostHeader component", () => {
  const subRedditName = "testSubReddit";
  const subRedditPicture = "/testPicture.jpg";
  const time = "1 hour ago";
  const isMember = false;
  const joined = false;
  const onSave = jest.fn();
  const onHide = jest.fn();
  const onReport = jest.fn();
  const onBlock = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it("renders correctly when not in comments page and not a profile and post is not my own", () => {
    render(
      <PostHeader
        postId={1}
        isUser={true}
        userName="testUser"
        showProfilePicture={true}
        profilePicture="/testProfilePicture.jpg"
        subRedditName={subRedditName}
        subRedditPicture={subRedditPicture}
        subRedditRules={["Rule 1", "Rule 2"]}
        time={time}
        banner="/testBanner.jpg"
        subRedditDescription="Test subreddit description"
        isProfile={false}
        isInComment={false}
        cakeDate="2022-04-17"
        isMember={isMember}
        joined={joined}
        onJoin={() => {}}
        isSaved={false}
        onSave={onSave}
        onDelete={() => {}}
        myPost={false}
        onHide={onHide}
        onReport={onReport}
        onBlock={onBlock}
        isSpoiler={false}
        onSpoiler={() => {}}
        isNSFW={false}
        onNSFW={() => {}}
        replyNotifications={false}
        onReplyNotifications={() => {}}
        onEdit={() => {}}
      />,
    );

    expect(screen.getByText(`r/${subRedditName}`)).toBeInTheDocument();
    expect(screen.getByText(time)).toBeInTheDocument();
    expect(screen.getByAltText("The subReddit picture")).toBeInTheDocument();
    expect(screen.getByAltText("options")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
  });

  it("displays the correct subreddit information when hovering over subreddit name", async () => {
    const { container, getByAltText } = render(
      <PostHeader
        postId={1}
        isUser={true}
        userName="testUser"
        showProfilePicture={true}
        profilePicture="/testProfilePicture.jpg"
        subRedditName={subRedditName}
        subRedditPicture={subRedditPicture}
        time={time}
        isProfile={false}
        isInComment={false}
        cakeDate="2022-04-17"
        isMember={isMember}
        joined={joined}
        onJoin={() => {}}
        isSaved={false}
        onSave={onSave}
        onDelete={() => {}}
        myPost={false}
        onHide={onHide}
        onReport={onReport}
        onBlock={onBlock}
        isSpoiler={false}
        onSpoiler={() => {}}
        isNSFW={false}
        onNSFW={() => {}}
        replyNotifications={false}
        onReplyNotifications={() => {}}
        onEdit={() => {}}
      />,
    );

    const subRedditNameLink = getByAltText("The subReddit picture").closest(
      "div",
    );
    fireEvent.mouseEnter(subRedditNameLink);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.getByText("description")).toBeInTheDocument();
  });

  it("displays correct icons based on different properties of the post and post is the user's", () => {
    render(
      <PostHeader
        postId={1}
        isUser={true}
        userName="testUser"
        showProfilePicture={true}
        profilePicture="/testProfilePicture.jpg"
        subRedditName={subRedditName}
        subRedditPicture={subRedditPicture}
        subRedditRules={["Rule 1", "Rule 2"]}
        time={time}
        banner="/testBanner.jpg"
        subRedditDescription="Test subreddit description"
        isProfile={false}
        isInComment={false}
        cakeDate="2022-04-17"
        isMember={isMember}
        joined={joined}
        onJoin={() => {}}
        isSaved={true}
        onSave={onSave}
        onDelete={() => {}}
        myPost={true}
        onHide={onHide}
        onReport={onReport}
        onBlock={onBlock}
        isSpoiler={false}
        onSpoiler={() => {}}
        isNSFW={true}
        onNSFW={() => {}}
        replyNotifications={false}
        onReplyNotifications={() => {}}
        onEdit={() => {}}
      />,
    );

    expect(screen.getByText("Remove from saved")).toBeInTheDocument();
    expect(screen.getByText("Add spoiler tag")).toBeInTheDocument();
    expect(screen.getByText("Remove NSFW tag")).toBeInTheDocument();
    expect(screen.getByText("Turn on reply notification")).toBeInTheDocument();
  });

  it("calls onSave when save button is clicked", () => {
    render(
      <PostHeader
        postId={1}
        isUser={true}
        userName="testUser"
        showProfilePicture={true}
        profilePicture="/testProfilePicture.jpg"
        subRedditName={subRedditName}
        subRedditPicture={subRedditPicture}
        subRedditRules={["Rule 1", "Rule 2"]}
        time={time}
        banner="/testBanner.jpg"
        subRedditDescription="Test subreddit description"
        isProfile={false}
        isInComment={false}
        cakeDate="2022-04-17"
        isMember={isMember}
        joined={joined}
        onJoin={() => {}}
        isSaved={false}
        onSave={onSave}
        onDelete={() => {}}
        myPost={false}
        onHide={onHide}
        onReport={onReport}
        onBlock={onBlock}
        isSpoiler={false}
        onSpoiler={() => {}}
        isNSFW={false}
        onNSFW={() => {}}
        replyNotifications={false}
        onReplyNotifications={() => {}}
        onEdit={() => {}}
      />,
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("Displays report modal when report button is clicked", () => {
    render(
      <PostHeader
        postId={1}
        isUser={true}
        userName="testUser"
        showProfilePicture={true}
        profilePicture="/testProfilePicture.jpg"
        subRedditName={subRedditName}
        subRedditPicture={subRedditPicture}
        subRedditRules={["Rule 1", "Rule 2"]}
        time={time}
        banner="/testBanner.jpg"
        subRedditDescription="Test subreddit description"
        isProfile={false}
        isInComment={false}
        cakeDate="2022-04-17"
        isMember={isMember}
        joined={joined}
        onJoin={() => {}}
        isSaved={false}
        onSave={onSave}
        onDelete={() => {}}
        myPost={false}
        onHide={onHide}
        onReport={onReport}
        onBlock={onBlock}
        isSpoiler={false}
        onSpoiler={() => {}}
        isNSFW={false}
        onNSFW={() => {}}
        replyNotifications={false}
        onReplyNotifications={() => {}}
        onEdit={() => {}}
      />,
    );

    const reportButton = screen.getByText("Report");
    fireEvent.click(reportButton);

    expect(screen.getByText("Submit a report")).toBeInTheDocument();
  });
});
