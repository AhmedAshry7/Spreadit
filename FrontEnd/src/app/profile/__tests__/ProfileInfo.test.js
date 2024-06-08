import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileInfo from "../ProfileInfo";
import "@testing-library/jest-dom";

describe("ProfileInfo component", () => {
  test("renders ProfileInfo component", () => {
    const { getByText, getByAltText } = render(
      <ProfileInfo username="Ahmed" />,
    );
    expect(getByText("Ahmed")).toBeInTheDocument();
    expect(getByText("Karma")).toBeInTheDocument();
    expect(getByAltText("comments image")).toBeInTheDocument();
  });

  test("ProfileInfo component dropdown click", () => {
    const toggleDropdown = jest.fn();

    const { getByTestId } = render(<ProfileInfo username="Ahmed" />);
    const button = getByTestId("dropdown");

    button.onclick = toggleDropdown;

    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(toggleDropdown).toHaveBeenCalledTimes(1);
  });

  test("Dropdown menu component renders", () => {
    const { getByTestId, getByAltText } = render(
      <ProfileInfo username="Ahmed" />,
    );
    const button = getByTestId("dropdown");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(getByAltText("Share Icon")).toBeInTheDocument();
    expect(getByAltText("Message Icon")).toBeInTheDocument();
    expect(getByAltText("Block Icon")).toBeInTheDocument();
    expect(getByAltText("Report Icon")).toBeInTheDocument();
  });

  test("ProfileInfo component follow click", () => {
    const followMock = jest.fn();

    const { getByTestId } = render(<ProfileInfo username="Ahmed" />);
    const button = getByTestId("follow-btn");
    button.onclick = followMock;
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(followMock).toHaveBeenCalledTimes(1);
  });

  test("ProfileInfo Unfollow button", () => {
    const { getByTestId, getByText } = render(<ProfileInfo username="Ahmed" />);
    const button = getByTestId("follow-btn");
    fireEvent.click(button);
    expect(getByText("Unfollow")).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
