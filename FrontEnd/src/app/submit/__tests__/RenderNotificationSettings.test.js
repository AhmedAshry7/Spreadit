import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RenderNotificationSettings from "../RenderNotificationSettings";

describe("RenderNotificationSettings component", () => {
  test("renders the component correctly", () => {
    render(<RenderNotificationSettings notify={true} setNotify={() => {}} />);

    expect(
      screen.getByText("Send me post reply notifications"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Connect accounts to share your post"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });

  test("toggles the checkbox correctly", () => {
    const mockSetNotify = jest.fn();

    render(
      <RenderNotificationSettings notify={true} setNotify={mockSetNotify} />,
    );
    const checkbox = screen.getByTestId("checkbox");

    fireEvent.click(checkbox);

    expect(mockSetNotify).toHaveBeenCalledWith(false);
  });

  test('redirects to the correct link when "Connect accounts" is clicked', () => {
    render(<RenderNotificationSettings notify={true} setNotify={() => {}} />);
    const connectLink = screen.getByText("Connect accounts to share your post");

    fireEvent.click(connectLink);

    expect(window.location.href).toBe("/settings#connected-accounts");
  });
});
