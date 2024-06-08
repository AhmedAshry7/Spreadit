jest.mock("../../assets/PP1.png", () => ({
  width: 100,
  heigth: 100,
}));

jest.mock(".../../assets/envelope.svg", () => ({
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
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import RightCommentsSidebar from "../RightCommentsSidebar";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("The Right Comments Sidebar tests", () => {
  const mockOnJoin = jest.fn();
  const mockRules = [
    { title: "Rule 1" },
    { title: "Rule 2" },
    { title: "Rule 3" },
  ];
  const mockModerators = [
    { profilePicture: "../../assets/PP1.png", userName: "moderator1" },
    { profilePicture: "../../assets/PP1.png", userName: "moderator2" },
  ];

  test('"checking it renders correctly" when not joined', () => {
    render(
      <RightCommentsSidebar
        name="r/Cats"
        description="Cats are so cute"
        members={100}
        rules={mockRules}
        isJoined={false}
        onJoin={mockOnJoin}
        moderators={mockModerators}
      />,
    );

    expect(screen.queryAllByText("r/Cats")).toHaveLength(2);
    expect(screen.getByText("Cats are so cute")).toBeInTheDocument();
    expect(screen.getByText(`${100}`)).toBeInTheDocument();
    expect(screen.getByText("Members")).toBeInTheDocument();
    expect(screen.getByText("RULES")).toBeInTheDocument();

    mockRules.forEach((rule) => {
      expect(screen.getByText(rule.title)).toBeInTheDocument();
    });

    mockModerators.forEach((moderator) => {
      expect(screen.getByText(moderator.userName)).toBeInTheDocument();
    });

    expect(screen.getByText("Message the Mods")).toBeInTheDocument();
    expect(screen.getByAltText("message icon")).toBeInTheDocument();

    const joinButton = screen.getByText("join");
    expect(joinButton).toBeInTheDocument();
    fireEvent.click(joinButton);
    expect(mockOnJoin).toHaveBeenCalledTimes(1);
  });

  test("checking it renders correctly when joined", () => {
    render(
      <RightCommentsSidebar
        name="r/Cats"
        description="Cats are so cute"
        members={100}
        rules={mockRules}
        isJoined={true}
        onJoin={mockOnJoin}
        moderators={mockModerators}
      />,
    );

    const joinedButton = screen.getByText("joined");
    expect(joinedButton).toBeInTheDocument();
    fireEvent.click(joinedButton);
    expect(mockOnJoin).toHaveBeenCalled;
  });

  /*       test('navigates to community page when clicked on community name', () => {

        render(
            <RightCommentsSidebar
                name='r/Cats'
                description='Cats are so cute'
                members={100}
                rules={mockRules}
                isJoined={true}
                onJoin={mockOnJoin}
                moderators={mockModerators}
            />
        );

          const mockRouterPush = jest.fn();
          useRouter.mockReturnValue({
              push: mockRouterPush,
          });
  
          expect(screen.queryAllByText("r/Cats")).toHaveLength(2);
          const title=screen.queryAllByText("r/Cats")[1];
          //fireEvent.click(title);
          //expect(mockRouterPush).toHaveBeenCalledWith(`/community/r/Cats`);
      }); */
});
