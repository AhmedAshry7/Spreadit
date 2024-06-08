import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Poll from "../Poll";

jest.mock("../../../utils/timeDifference", () => {
  return jest.fn().mockReturnValue("mock time difference");
});

describe("Poll component", () => {
  const options = [
    { option: "Option 1", votes: 10 },
    { option: "Option 2", votes: 5 },
    { option: "Option 3", votes: 8 },
  ];

  afterEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    render(
      <Poll
        isOpen={true}
        options={options}
        onVote={() => {}}
        pollExpiration={new Date()}
        myVote={""}
      />,
    );

    expect(screen.getByText("Open")).toBeInTheDocument();

    expect(screen.getByText("23 total votes")).toBeInTheDocument();

    expect(screen.getByText("Vote")).toBeInTheDocument();

    expect(screen.getAllByRole("radio")).toHaveLength(options.length);
  });

  it("can't vote until a choice is selected", () => {
    const onVoteMock = jest.fn();
    render(
      <Poll
        isOpen={true}
        options={options}
        onVote={onVoteMock}
        pollExpiration={new Date()}
        myVote={null}
      />,
    );

    fireEvent.click(screen.getByText("Vote"));

    expect(onVoteMock).toHaveBeenCalledTimes(0);
  });

  it("applies correct styling to a choice once selected", () => {
    const onVoteMock = jest.fn();
    render(
      <Poll
        isOpen={true}
        options={options}
        onVote={onVoteMock}
        pollExpiration={new Date()}
        myVote={""}
      />,
    );

    fireEvent.click(screen.getByText("Option 2"));

    const selectedDiv = screen.getByText("Option 2").closest(".radio");

    expect(selectedDiv.firstChild).toHaveClass("selected");
  });

  it("renders correctly when poll is closed and user has not voted", () => {
    render(
      <Poll
        isOpen={false}
        options={options}
        onVote={() => {}}
        pollExpiration={new Date()}
        myVote={""}
      />,
    );

    expect(screen.getByText("Closed")).toBeInTheDocument();

    expect(screen.queryByText("Vote")).not.toBeInTheDocument();

    expect(screen.queryAllByRole("radio")).toHaveLength(0);

    expect(screen.queryByAltText("selected choice")).not.toBeInTheDocument();
  });

  it("renders correctly when user has already voted and the poll is still open and user's vote is not the winning vote", () => {
    const myVote = "Option 2";
    render(
      <Poll
        isOpen={true}
        options={options}
        pollExpiration={new Date()}
        myVote={myVote}
      />,
    );

    expect(screen.getByText("Open")).toBeInTheDocument();

    expect(screen.getByText("23 total votes")).toBeInTheDocument();

    expect(screen.queryByText("Vote")).not.toBeInTheDocument();

    expect(screen.queryAllByRole("radio")).toHaveLength(0);

    const selectedDiv = screen.getByText("Option 2").closest(".results ");

    expect(selectedDiv).toBeInTheDocument();

    expect(selectedDiv).toContainHTML("<img ");

    expect(selectedDiv).not.toHaveClass("selected");
  });

  it("renders correctly when user has already voted and the poll is still open and user's vote is also the winning vote", () => {
    const myVote = "Option 1";
    render(
      <Poll
        isOpen={true}
        options={options}
        pollExpiration={new Date()}
        myVote={myVote}
      />,
    );

    expect(screen.getByText("Open")).toBeInTheDocument();

    expect(screen.getByText("23 total votes")).toBeInTheDocument();

    expect(screen.queryByText("Vote")).not.toBeInTheDocument();

    expect(screen.queryAllByRole("radio")).toHaveLength(0);

    const selectedDiv = screen.getByText("Option 1").closest(".results ");

    expect(selectedDiv).toBeInTheDocument();

    expect(selectedDiv).toContainHTML("<img ");

    expect(selectedDiv).toHaveClass("selected");
  });

  it("calls onVote and increases vote of choice and total votes when a choice is selected and vote is clicked", () => {
    const onVoteMock = jest.fn();
    render(
      <Poll
        isOpen={true}
        options={options}
        onVote={onVoteMock}
        pollExpiration={new Date()}
        myVote={""}
      />,
    );

    expect(screen.getByText("23 total votes")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Option 2"));

    fireEvent.click(screen.getByText("Vote"));

    expect(screen.getByText("24 total votes")).toBeInTheDocument();

    const selectedDiv = screen.getByText("Option 2").closest(".results ");

    expect(selectedDiv).toHaveTextContent("6");

    expect(onVoteMock).toHaveBeenCalledTimes(1);
  });
});
