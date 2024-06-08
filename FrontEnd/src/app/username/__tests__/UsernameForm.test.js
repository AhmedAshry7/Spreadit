import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsernameForm from "../UsernameForm";
import "@testing-library/jest-dom";

describe("UsernameForm component", () => {
  it("renders the Form correctly", () => {
    const { getByPlaceholderText, getByText } = render(<UsernameForm />);
    expect(getByPlaceholderText("Email")).toBeInTheDocument(); // for email input
    expect(getByText("Email Me")).toBeInTheDocument(); // for submit button
  });

  it("calls handleInputChange when typing in the input", async () => {
    const handleInputChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <UsernameForm handleInputChange={handleInputChangeMock} />,
    );
    const input = getByPlaceholderText("Email");
    await userEvent.type(input, "test@gmail.com");
    expect(input).toHaveValue("test@gmail.com");
  });

  it("calls handleSubmit when the submit button is pressed", async () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<UsernameForm handleSubmit={handleSubmit} />);
    const btn = getByText("Email Me");
    await userEvent.click(btn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("Chekcs if the error messages are displayed", () => {
    const { getByText } = render(<UsernameForm emailError="invalid email" />);
    expect(getByText("invalid email")).toBeInTheDocument();
  });
});
