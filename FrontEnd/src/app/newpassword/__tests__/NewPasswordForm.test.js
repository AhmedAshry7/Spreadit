import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewPasswordForm from "../NewPasswordForm";
import "@testing-library/jest-dom";

describe("NewPasswordForm component", () => {
  it("renders the Form correctly", () => {
    const { getByPlaceholderText, getByText } = render(<NewPasswordForm />);
    expect(getByPlaceholderText("New Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Verify Password")).toBeInTheDocument();
    expect(getByText("Set Password")).toBeInTheDocument();
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <NewPasswordForm handleInputChange={handleInputChangeMock} />,
    );
    const newPassword = getByPlaceholderText("New Password");
    const verifyPassword = getByPlaceholderText("Verify Password");
    await userEvent.type(verifyPassword, "123456789");
    await userEvent.type(newPassword, "123456789");
    expect(newPassword).toHaveValue("123456789");
    expect(verifyPassword).toHaveValue("123456789");
  });

  it("calls handleSubmit when the submit button is pressed", async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(
      <NewPasswordForm handleSubmit={handleSubmit} />,
    );
    const btn = getByText("Set Password");
    await userEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("Paragraph is rendered if the passwords are not equal", () => {
    const { getByText } = render(<NewPasswordForm isEqual={false} />);
    expect(getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("Paragraph is rendered if the passwords less than 8 characters long", () => {
    const { getByText } = render(<NewPasswordForm isLong={false} />);
    expect(
      getByText("Password must be at least 8 characters"),
    ).toBeInTheDocument();
  });
});
