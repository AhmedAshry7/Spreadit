import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MyProfileInfo from "../MyProfileInfo";
import "@testing-library/jest-dom";

describe("MyProfileInfo component", () => {
  test("renders MyProfileInfo component", () => {
    const { getByText, getByAltText } = render(
      <MyProfileInfo username="Ahmed" />,
    );
    expect(getByText("Ahmed")).toBeInTheDocument();
    expect(getByText("Post Karma")).toBeInTheDocument();
    expect(getByAltText("Banner Image")).toBeInTheDocument();
    expect(getByAltText("Post Options")).toBeInTheDocument();
  });

  test("MyProfileInfo Share Button", () => {
    const shareMock = jest.fn();
    const { getByText } = render(<MyProfileInfo username="Ahmed" />);
    const buttonChild = getByText("Share");
    const button = buttonChild.parentElement;
    button.onclick = shareMock;
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(shareMock).toHaveBeenCalledTimes(1);
  });

  test("Settings Icons are showing", () => {
    const { getByText } = render(<MyProfileInfo username="Ahmed" />);
    expect(getByText("Edit Profile")).toBeInTheDocument();
    expect(getByText("Style Avatar")).toBeInTheDocument();
    expect(getByText("Mod Settings")).toBeInTheDocument();
  });

  test("MyProfileInfo Social Links Show", () => {
    const { getByText } = render(<MyProfileInfo username="Ahmed" />);
    expect(getByText("Links")).toBeInTheDocument();
    expect(getByText("Add Social Link")).toBeInTheDocument();
  });

  test("MyProfileInfo Moderator", () => {
    const { getByText } = render(<MyProfileInfo username="Ahmed" />);
    expect(
      getByText("YOU'RE A MODERATOR OF THESE COMMUNITIES"),
    ).toBeInTheDocument();
    expect(getByText("r/awws")).toBeInTheDocument();
  });
});
// test("MyProfileInfo component dropdown click", () => {
//     const toggleDropdown = jest.fn();

//     const { getByTestId } = render(<MyProfileInfo username="Ahmed" />);
//     const button = getByTestId("dropdown");

//     button.onclick = toggleDropdown;

//     fireEvent.click(button);
//     expect(button).toBeInTheDocument();
//     expect(toggleDropdown).toHaveBeenCalledTimes(1);
// })

// test("Dropdown menu component renders", () => {
//     const { getByTestId, getByAltText } = render(<MyProfileInfo username="Ahmed" />);
//     const button = getByTestId("dropdown");
//     fireEvent.click(button);
//     expect(button).toBeInTheDocument();
//     expect(getByAltText("Share Icon")).toBeInTheDocument();
//     expect(getByAltText("Message Icon")).toBeInTheDocument();
//     expect(getByAltText("Block Icon")).toBeInTheDocument();
//     expect(getByAltText("Report Icon")).toBeInTheDocument();

// })

// test("MyProfileInfo component follow click", () => {
//     const followMock = jest.fn();

//     const { getByTestId } = render(<MyProfileInfo username="Ahmed" />);
//     const button = getByTestId("follow-btn");
//     button.onclick = followMock;
//     fireEvent.click(button);
//     expect(button).toBeInTheDocument();
//     expect(followMock).toHaveBeenCalledTimes(1);
// })

// test("MyProfileInfo Unfollow button", () => {
//     const { getByTestId, getByText } = render(<MyProfileInfo username="Ahmed" />);
//     const button = getByTestId("follow-btn");
//     fireEvent.click(button);
//     expect(getByText("Unfollow")).toBeInTheDocument();
//     expect(button).toBeInTheDocument();
// })
