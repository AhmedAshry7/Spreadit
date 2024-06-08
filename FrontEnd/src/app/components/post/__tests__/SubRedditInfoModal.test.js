import { render, screen, fireEvent } from "@testing-library/react";
import SubRedditInfoModal from "../SubRedditInfoModal";

describe("SubRedditInfoModal component", () => {
  const subRedditName = "testSubReddit";
  const subRedditDescription = "This is a test subreddit";
  const subRedditBanner = "/testBanner.jpg";
  const subRedditPicture = "/testPicture.jpg";
  const isMember = false;
  const joined = false;

  it("renders correctly", () => {
    render(
      <SubRedditInfoModal
        subRedditBanner={subRedditBanner}
        subRedditPicture={subRedditPicture}
        subRedditName={subRedditName}
        subRedditDescription={subRedditDescription}
        isMember={isMember}
        joined={joined}
        onJoin={() => {}}
      />,
    );

    expect(screen.getByText(`r/${subRedditName}`)).toBeInTheDocument();
    expect(screen.getByText(subRedditDescription)).toBeInTheDocument();
    expect(screen.getByAltText("The subReddit banner")).toBeInTheDocument();
    expect(screen.getByAltText("The subReddit picture")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
  });

  it("displays 'Leave' button if user has joined the subreddit", () => {
    render(
      <SubRedditInfoModal
        subRedditBanner={subRedditBanner}
        subRedditPicture={subRedditPicture}
        subRedditName={subRedditName}
        subRedditDescription={subRedditDescription}
        isMember={isMember}
        joined={true}
        onJoin={() => {}}
      />,
    );

    expect(screen.getByText("Leave")).toBeInTheDocument();
    expect(screen.queryByText("Join")).not.toBeInTheDocument();
  });

  it("ddoesn't display join or leave button if user was already a member of the subreddit", () => {
    render(
      <SubRedditInfoModal
        subRedditBanner={subRedditBanner}
        subRedditPicture={subRedditPicture}
        subRedditName={subRedditName}
        subRedditDescription={subRedditDescription}
        isMember={true}
        joined={joined}
        onJoin={() => {}}
      />,
    );

    expect(screen.queryByText("Leave")).not.toBeInTheDocument();
    expect(screen.queryByText("Join")).not.toBeInTheDocument();
  });

  it("calls onJoin function when 'Join' button is clicked", () => {
    const onJoinMock = jest.fn();
    render(
      <SubRedditInfoModal
        subRedditBanner={subRedditBanner}
        subRedditPicture={subRedditPicture}
        subRedditName={subRedditName}
        subRedditDescription={subRedditDescription}
        isMember={isMember}
        joined={false}
        onJoin={onJoinMock}
      />,
    );

    fireEvent.click(screen.getByText("Join"));
    expect(onJoinMock).toHaveBeenCalledTimes(1);
  });

  it("calls onJoin function when 'Leave' button is clicked", () => {
    const onJoinMock = jest.fn();
    render(
      <SubRedditInfoModal
        subRedditBanner={subRedditBanner}
        subRedditPicture={subRedditPicture}
        subRedditName={subRedditName}
        subRedditDescription={subRedditDescription}
        isMember={isMember}
        joined={true}
        onJoin={onJoinMock}
      />,
    );

    fireEvent.click(screen.getByText("Leave"));
    expect(onJoinMock).toHaveBeenCalledTimes(1);
  });

  it("has the link of the subreddit to redirect to when subreddit name is clicked", () => {
    const onJoinMock = jest.fn();
    const { getByRole } = render(
      <SubRedditInfoModal
        subRedditBanner={subRedditBanner}
        subRedditPicture={subRedditPicture}
        subRedditName={subRedditName}
        subRedditDescription={subRedditDescription}
        isMember={isMember}
        joined={true}
        onJoin={onJoinMock}
      />,
    );

    expect(getByRole("link", { name: `r/${subRedditName}` })).toHaveAttribute(
      "href",
      `/community/${subRedditName}`,
    );
  });
});
