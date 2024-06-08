import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserCard from "../[communityName]/moderation/(UserManagement)/UserCard";

describe("User Card", () => {
  const setShowModal = jest.fn();
  const setModalInfo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.mock("../../utils/getCookies", () => ({
    getCookies: jest.fn(),
  }));

  test("renders the card correctly with type banned", () => {
    const user = {
      username: "test ",
      avatar:
        "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
      duration: "1",
      modNote: "ay 7aga",
      reason: "Other",
    };
    const { getByText } = render(
      <UserCard
        username={user.username}
        avatar={user.avatar}
        type="banned"
        duration={user.duration}
        modNote={user.modNote}
        reason={user.reason}
        setModalInfo={setModalInfo}
        setShowModal={setShowModal}
      />,
    );
    expect(getByText("test")).toBeInTheDocument();
    expect(getByText("1 days")).toBeInTheDocument();
    expect(getByText(user.reason)).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
    expect(getByText("More Details")).toBeInTheDocument();
  });
});
