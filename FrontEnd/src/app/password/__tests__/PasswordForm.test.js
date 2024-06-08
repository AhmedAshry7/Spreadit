import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordForm from "../PasswordForm";
import "@testing-library/jest-dom";

describe("PasswordForm component", () => {
  it("renders the Form correctly", () => {
    const { getByPlaceholderText, getByText } = render(<PasswordForm />);
    expect(getByPlaceholderText("Email")).toBeInTheDocument(); // for email input
    expect(getByPlaceholderText("Username")).toBeInTheDocument(); // for username input
    expect(getByText("Reset Password")).toBeInTheDocument(); // for submit button
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <PasswordForm handleInputChange={handleInputChangeMock} />,
    );
    const email = getByPlaceholderText("Email");
    const username = getByPlaceholderText("Username");
    await userEvent.type(username, "test");
    await userEvent.type(email, "test@gmail.com");
    expect(email).toHaveValue("test@gmail.com");
    expect(username).toHaveValue("test");
  });

  it("calls handleSubmit when the submit button is pressed", async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<PasswordForm handleSubmit={handleSubmit} />);
    const btn = getByText("Reset Password");
    await userEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("Chekcs if the error messages are displayed", () => {
    const { getByText } = render(
      <PasswordForm
        usernameError="wrong username"
        emailError="invalid username"
      />,
    );
    expect(getByText("wrong username")).toBeInTheDocument();
    expect(getByText("invalid username")).toBeInTheDocument();
  });
});
