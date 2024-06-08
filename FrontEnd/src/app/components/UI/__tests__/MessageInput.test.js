import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MessageInput from "../MessageInput";

describe("The MessageInput component tests", () => {
  const onSendMock = jest.fn();
  const setmessageMock = jest.fn();
  const setimageMock = jest.fn();

  test("calls onSend function when send icon is clicked with message", () => {
    const { getByAltText } = render(
      <MessageInput
        onSend={onSendMock}
        message="Test Message"
        setmessage={setmessageMock}
        image=""
        setimage={setimageMock}
      />,
    );
    fireEvent.click(getByAltText("send icon"));
    expect(onSendMock).toHaveBeenCalledTimes(1);
  });

  test("updates message state when input value changes", () => {
    const { getByPlaceholderText } = render(
      <MessageInput
        onSend={onSendMock}
        message=""
        setmessage={setmessageMock}
        image=""
        setimage={setimageMock}
      />,
    );
    const inputElement = getByPlaceholderText("Message");
    fireEvent.change(inputElement, { target: { value: "Test Message" } });
    expect(setmessageMock).toHaveBeenCalledWith("Test Message");
  });

  test("calls handleImageClick when image icon is clicked", () => {
    const { getByAltText } = render(
      <MessageInput
        onSend={onSendMock}
        message=""
        setmessage={setmessageMock}
        image=""
        setimage={setimageMock}
      />,
    );
    fireEvent.click(getByAltText("image icon"));
    // Add assertions for handleImageClick function
  });

  // Add more test cases for other interactions as needed
});
