jest.mock("../../assets/mailimage.png", () => ({
  width: 100,
  heigth: 100,
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock("../../../utils/getCookies", () => ({
  __esModule: true,
  default: async () => ({
    username: "testuser",
    access_token: "testtoken",
  }),
}));

jest.mock("../../../utils/apiHandler");
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ChangeEmailModal from "../ChangeEmailModal";
import { expect } from "@jest/globals";

describe("The change email tests", () => {
  const mockClose = jest.fn();
  const mockUpdateText = jest.fn();
  beforeEach(() => {
    render(<ChangeEmailModal close={mockClose} updatetext={mockUpdateText} />);
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("Update your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CURRENT PASSWORD")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("NEW EMAIL")).toBeInTheDocument();
    expect(screen.getByText("Save email")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it shows error when the input is wrong", async () => {
    const passwordInput = screen.getByPlaceholderText("CURRENT PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    expect(passwordInput).toHaveValue("12345");
    const userNameInput = screen.getByPlaceholderText("NEW EMAIL");
    fireEvent.change(userNameInput, { target: { value: "aa23 " } });
    expect(userNameInput).toHaveValue("aa23");
    const saveButton = screen.getByText("Save email");
    fireEvent.click(saveButton);
    expect(
      screen.getByText("Please enter a valid email address."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 8 characters long."),
    ).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("closes when X button is clicked", async () => {
    const xButton = screen.getByText("X");
    fireEvent.click(xButton);
    expect(mockClose).toHaveBeenCalled();
    //expect(false).toBe(true);
  });

  test("checking that it shows no error when the input is not wrong", async () => {
    const passwordInput = screen.getByPlaceholderText("CURRENT PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    expect(passwordInput).toHaveValue("123456789");
    const userNameInput = screen.getByPlaceholderText("NEW EMAIL");
    fireEvent.change(userNameInput, { target: { value: "aa23@gmal.com " } });
    expect(userNameInput).toHaveValue("aa23@gmal.com");
    const saveButton = screen.getByText("Save email");
    fireEvent.click(saveButton);
    expect(
      screen.queryByText("Please enter a valid email address."),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password must be at least 8 characters long."),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });
});
