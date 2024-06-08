import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import PopupMessage from "../PopupMessage";

describe("PopupMessage component", () => {
  test("renders the component with the message", () => {
    const message = "message";
    const { getByText } = render(<PopupMessage message={message} />);
    expect(getByText("message")).toBeInTheDocument();
  });

  test("displays the popup message initially", () => {
    const message = "message";
    const { getByText } = render(<PopupMessage message={message} />);
    const popupMessage = getByText(message).parentElement;
    expect(popupMessage).toHaveClass("show");
  });

  test("hides the popup message after 3 seconds", async () => {
    const message = "message";
    const { getByText } = render(<PopupMessage message={message} />);
    const popupMessage = getByText(message).parentElement;

    expect(popupMessage).toHaveClass("show");
    await waitFor(() => expect(popupMessage).toHaveClass("hide"));
  });
});
