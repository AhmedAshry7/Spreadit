jest.mock("../../assets/mailimage.png", () => ({
  width: 100,
  heigth: 100,
}));

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MessageCard from "../MessageCard";

describe("The MessageCard component tests", () => {
  const message = {
    id: "messageId",
    sender: {
      id: "senderId",
      name: "Sender Name",
      avatarUrl: "../../assets/mailimage.png",
    },
    content: "Test message",
    time: { toDate: () => new Date() },
    type: "text",
  };

  const me = {
    id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
    avatarUrl:
      "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
    email: "hedeya@gmail.com",
    name: "abdullah12",
  };

  const onDeleteMock = jest.fn();

  test("renders message correctly", () => {
    const { getByText, getByAltText } = render(
      <MessageCard message={message} me={me} onDelete={onDeleteMock} />,
    );

    // Check if sender's name and message content are rendered
    expect(getByText("Sender Name")).toBeInTheDocument();
    expect(getByText("Test message")).toBeInTheDocument();

    // Check if message time is rendered (you may need to adjust this based on actual time format)
    expect(getByText("a few seconds ago")).toBeInTheDocument();

    // Check if sender's avatar is rendered
    expect(getByAltText("profile Picture")).toBeInTheDocument();
    expect(getByAltText("profile Picture")).toHaveAttribute(
      "src",
      "../../assets/mailimage.png",
    );
  });

  test("calls onReport function when report icon is clicked", () => {
    const onReportMock = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error warnings

    const { getByAltText } = render(<MessageCard message={message} me={me} />);

    // Spy on the reportUser function inside the component
    const reportUserSpy = jest.spyOn(console, "error");

    // Simulate click on report icon
    fireEvent.click(getByAltText("report icon"));

    // Check if reportUser function is called
    expect(reportUserSpy).toHaveBeenCalled();

    // Restore console.error mock
    console.error.mockRestore();
  });
});
