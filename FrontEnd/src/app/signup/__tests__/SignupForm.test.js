import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "../SignupForm";
import "@testing-library/jest-dom";

describe("SignupForm component", () => {
  it("renders the Form correctly", () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />);
    expect(getByPlaceholderText("Email")).toBeInTheDocument(); // for email input
    expect(getByPlaceholderText("Username")).toBeInTheDocument(); // for username input
    expect(getByPlaceholderText("Password")).toBeInTheDocument(); // for password input
    expect(getByText("Continue")).toBeInTheDocument(); // for submit button
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SignupForm handleInputChange={handleInputChangeMock} />,
    );
    const input = getByPlaceholderText("Email");
    await userEvent.type(input, "test@gmail.com");
    expect(input).toHaveValue("test@gmail.com");
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SignupForm handleInputChange={handleInputChangeMock} />,
    );
    const input = getByPlaceholderText("Username");
    await userEvent.type(input, "testusername");
    expect(input).toHaveValue("testusername");
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SignupForm handleInputChange={handleInputChangeMock} />,
    );
    const input = getByPlaceholderText("Password");
    await userEvent.type(input, "testpassword");
    expect(input).toHaveValue("testpassword");
  });

  it("calls handleSubmit when the submit button is pressed", async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<SignupForm handleSubmit={handleSubmit} />);
    const btn = getByText("Continue");
    await userEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
