import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileBar from "../ProfileBar";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ProfileBar component", () => {
  test("renders ProfileBar for the user's account", () => {
    const { getByText } = render(
      <ProfileBar
        selected={0}
        isMe={true}
        setSelected={() => {}}
        username="Ahmed"
      />,
    );
    expect(getByText("Overview")).toBeInTheDocument();
    expect(getByText("Posts")).toBeInTheDocument();
    expect(getByText("Comments")).toBeInTheDocument();
    expect(getByText("Saved")).toBeInTheDocument();
    expect(getByText("Hidden")).toBeInTheDocument();
    expect(getByText("Upvoted")).toBeInTheDocument();
    expect(getByText("Downvoted")).toBeInTheDocument();
  });

  test("renders ProfileBar for another user's account", () => {
    const { getByText } = render(
      <ProfileBar
        selected={0}
        isMe={false}
        setSelected={() => {}}
        username="Ahmed"
      />,
    );
    expect(getByText("Overview")).toBeInTheDocument();
    expect(getByText("Posts")).toBeInTheDocument();
    expect(getByText("Comments")).toBeInTheDocument();
  });

  test("ProfileBar Post button", () => {
    const setSelected = jest.fn();
    const { getByTestId } = render(
      <ProfileBar
        selected={0}
        isMe={true}
        setSelected={setSelected}
        username="Ahmed"
      />,
    );
    const button = getByTestId("Posts");
    button.onclick = setSelected;
    fireEvent.click(button);
    expect(setSelected).toHaveBeenCalledTimes(1);
  });
});
