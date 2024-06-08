import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import "@testing-library/jest-dom";

describe("LoginForm component", () => {
  it("renders the Form correctly", () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    expect(getByPlaceholderText("Username")).toBeInTheDocument(); // for username input
    expect(getByPlaceholderText("Password")).toBeInTheDocument(); // for password input
    expect(getByText("Log in")).toBeInTheDocument(); // for submit button
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <LoginForm handleInputChange={handleInputChangeMock} />,
    );
    const input = getByPlaceholderText("Username");
    await userEvent.type(input, "testusername");
    expect(input).toHaveValue("testusername");
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <LoginForm handleInputChange={handleInputChangeMock} />,
    );
    const input = getByPlaceholderText("Password");
    await userEvent.type(input, "testpassword");
    expect(input).toHaveValue("testpassword");
  });

  it("calls handleSubmit when the submit button is pressed", async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<LoginForm handleSubmit={handleSubmit} />);
    const btn = getByText("Log in");
    await userEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
