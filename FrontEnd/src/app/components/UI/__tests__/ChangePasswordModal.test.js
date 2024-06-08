jest.mock("../../assets/reddit-side-art.png", () => ({
  width: 100,
  heigth: 100,
}));
jest.mock("../../assets/logoSpreadIt.svg", () => ({
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
import ChangePasswordModal from "../ChangePasswordModal";
import { expect } from "@jest/globals";

describe("The delete button tests", () => {
  const mockClose = jest.fn();

  beforeEach(() => {
    render(<ChangePasswordModal close={mockClose} />);
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("Update your password")).toBeInTheDocument();
    expect(screen.getByTestId("old-password")).toBeInTheDocument();
    expect(screen.getByTestId("new-password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-new-password")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Log me out everywhere")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it shows error when the input is less than 8 characters", () => {
    const oldPassword = screen.getByTestId("old-password");
    fireEvent.change(oldPassword, { target: { value: "12345" } });
    const newPassword = screen.getByTestId("new-password");
    fireEvent.change(newPassword, { target: { value: "12" } });
    const confirmNewPassword = screen.getByTestId("confirm-new-password");
    fireEvent.change(confirmNewPassword, { target: { value: "12" } });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(
      screen.queryAllByText("Password must be at least 8 characters long."),
    ).toHaveLength(3);
    //expect(false).toBe(true);
  });

  test("checking that it shows error passwords mismatch", () => {
    const oldPassword = screen.getByTestId("old-password");
    fireEvent.change(oldPassword, { target: { value: "123456789" } });
    const newPassword = screen.getByTestId("new-password");
    fireEvent.change(newPassword, { target: { value: "12" } });
    const confirmNewPassword = screen.getByTestId("confirm-new-password");
    fireEvent.change(confirmNewPassword, { target: { value: "12341234" } });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(
      screen.getByText("Password must be at least 8 characters long."),
    ).toBeInTheDocument();
    expect(screen.getByText("Passwords doesnt match")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("closes when X button is clicked", async () => {
    const xButton = screen.getByText("X");
    fireEvent.click(xButton);
    expect(mockClose).toHaveBeenCalled();
    //expect(false).toBe(true);
  });

  test("checking that it doesn't show any error when the inputs are correct", async () => {
    const oldPassword = screen.getByTestId("old-password");
    fireEvent.change(oldPassword, { target: { value: "123456789" } });
    const newPassword = screen.getByTestId("new-password");
    fireEvent.change(newPassword, { target: { value: "12121212" } });
    const confirmNewPassword = screen.getByTestId("confirm-new-password");
    fireEvent.change(confirmNewPassword, { target: { value: "12121212" } });
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(
      screen.queryByText("Passwords doesnt match"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password must be at least 8 characters long."),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });
});
