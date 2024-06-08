import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ReportModal from "../ReportModal";

describe("ReportModal Component", () => {
  const closeModal = jest.fn();
  const onReport = jest.fn();
  const subRedditRules = [
    { reportReason: "Reason 1" },
    { reportReason: "Reason 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders StageOne correctly", () => {
    render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={subRedditRules}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );
    expect(screen.getByText("Submit a report")).toBeInTheDocument();
    expect(
      screen.getByText("Breaks r/testSubReddit rules"),
    ).toBeInTheDocument();
  });

  it("allows closing modal in stage one", () => {
    const { container } = render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={subRedditRules}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );
    fireEvent.click(screen.getByAltText("close"));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it("correctly applies styling to selected reason and displays its description", () => {
    render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={[]}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );

    const selectedReason = screen.getByText("Harassment");
    fireEvent.click(selectedReason);

    expect(selectedReason).toHaveClass("selected");

    const harassmentDescription = screen.getByText(
      "Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.",
    );
    expect(harassmentDescription).toBeInTheDocument();
  });

  it("allows selecting a reason and submitting in StageOne", () => {
    render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={[]}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );

    fireEvent.click(screen.getByText("Hate"));
    fireEvent.click(screen.getByText("Submit Report"));

    expect(onReport).toHaveBeenCalledWith("Hate", "");
  });

  it("allows selecting a reason and progressing to StageTwo from StageOne", () => {
    render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={[]}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );

    fireEvent.click(screen.getByText("Spam"));
    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByText("Harmful bots")).toBeInTheDocument();
  });

  it("renders StageTwo correctly", () => {
    render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={[
          { reportReason: "Reason 1" },
          { reportReason: "Reason 2" },
        ]}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );
    fireEvent.click(screen.getByText("Harassment"));
    fireEvent.click(screen.getByText("Next"));

    expect(
      screen.getByText("Who is the harassment towards?"),
    ).toBeInTheDocument();
  });

  it("allows closing modal in stage two", () => {
    const { container } = render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={subRedditRules}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );

    fireEvent.click(screen.getByText("Harassment"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByAltText("close"));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it("allows returning to stage one from stage two", () => {
    const { container } = render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={subRedditRules}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );

    fireEvent.click(screen.getByText("Harassment"));
    fireEvent.click(screen.getByText("Next"));

    fireEvent.click(screen.getByAltText("back"));

    expect(screen.getByText("Submit a report")).toBeInTheDocument();
    expect(
      screen.getByText("Breaks r/testSubReddit rules"),
    ).toBeInTheDocument();
  });

  it("allows selecting a reason and submitting in StageTwo", () => {
    render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={[]}
        closeModal={closeModal}
        onReport={onReport}
        userName="testUser"
      />,
    );

    fireEvent.click(screen.getByText("Harassment"));
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("You"));
    fireEvent.click(screen.getByText("Submit"));

    expect(onReport).toHaveBeenCalledWith("Harassment", "You");
  });

  it("renders StageThree correctly", () => {
    const onBlock = jest.fn();
    render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={[
          { reportReason: "Reason 1" },
          { reportReason: "Reason 2" },
        ]}
        closeModal={closeModal}
        onReport={onReport}
        onBlock={onBlock}
        userName="testUser"
      />,
    );

    fireEvent.click(screen.getByText("Harassment"));
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("You"));
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("Thanks for your report")).toBeInTheDocument();
  });

  it("allows blocking a user in StageThree", () => {
    const onBlock = jest.fn();
    const { container } = render(
      <ReportModal
        subRedditPicture="path/to/picture"
        subRedditName="testSubReddit"
        subRedditRules={[
          { reportReason: "Reason 1" },
          { reportReason: "Reason 2" },
        ]}
        closeModal={closeModal}
        onReport={onReport}
        onBlock={onBlock}
        userName="testUser"
      />,
    );

    fireEvent.click(screen.getByText("Harassment"));
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Someone else"));
    fireEvent.click(screen.getByText("Submit"));

    const toggleInput = container.querySelector('input[type="checkbox"]');
    fireEvent.click(toggleInput);

    fireEvent.click(screen.getByText("Done"));

    expect(onBlock).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
