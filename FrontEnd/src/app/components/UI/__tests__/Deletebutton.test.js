jest.mock("../../assets/binimage.png", () => ({
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
import Deletebutton from "../Deletebutton";
import { expect } from "@jest/globals";

describe("The delete button tests", () => {
  const mockDelete = jest.fn();
  let deleteButtonInstance;

  beforeEach(() => {
    deleteButtonInstance = render(<Deletebutton username="aaaa" />);
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("DELETE ACCOUNT")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it opens modal when button is clicked", () => {
    const deleteButton1 = screen.getByText("DELETE ACCOUNT");
    fireEvent.click(deleteButton1);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it shows error when password input is less than 8 characters", async () => {
    const deleteButton1 = screen.getByText("DELETE ACCOUNT");
    fireEvent.click(deleteButton1);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    expect(passwordInput).toHaveValue("12345");
    const userNameInput = screen.getByPlaceholderText("USERNAME");
    fireEvent.change(userNameInput, { target: { value: "aaaa" } });
    expect(userNameInput).toHaveValue("aaaa");
    const checkBox = screen.getByRole("checkbox");
    fireEvent.click(checkBox);
    const deleteButton2 = screen.getByText("DELETE");
    fireEvent.click(deleteButton2);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    expect(
      screen.queryByText("Be absolutely sure before deleting your account"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 8 characters long."),
    ).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it shows error when username is invalid", async () => {
    const deleteButton1 = screen.getByText("DELETE ACCOUNT");
    fireEvent.click(deleteButton1);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    expect(passwordInput).toHaveValue("123456789");
    const userNameInput = screen.getByPlaceholderText("USERNAME");
    fireEvent.change(userNameInput, { target: { value: "ahmed" } });
    expect(userNameInput).toHaveValue("ahmed");
    const checkBox = screen.getByRole("checkbox");
    fireEvent.click(checkBox);
    const deleteButton2 = screen.getByText("DELETE");
    fireEvent.click(deleteButton2);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    expect(
      screen.queryByText("Be absolutely sure before deleting your account"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Invalid Username")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that delete button is disabled when checkbox is not clicked", async () => {
    const deleteButton1 = screen.getByText("DELETE ACCOUNT");
    fireEvent.click(deleteButton1);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    expect(passwordInput).toHaveValue("123456789");
    const userNameInput = screen.getByPlaceholderText("USERNAME");
    fireEvent.change(userNameInput, { target: { value: "aaaa" } });
    expect(userNameInput).toHaveValue("aaaa");
    const deleteButton2 = screen.getByText("DELETE");
    fireEvent.click(deleteButton2);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    expect(
      screen.queryByText("Be absolutely sure before deleting your account"),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("closes when X button is clicked", async () => {
    const deleteButton = screen.getByText("DELETE ACCOUNT");
    fireEvent.click(deleteButton);
    const xButton = screen.getByText("X");
    fireEvent.click(xButton);
    expect(
      screen.queryByText("Be absolutely sure before deleting your account"),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("closes when cancel button is clicked", async () => {
    const deleteButton = screen.getByText("DELETE ACCOUNT");
    fireEvent.click(deleteButton);
    const cancelButton = screen.getByText("CANCEL");
    fireEvent.click(cancelButton);
    expect(
      screen.queryByText("Be absolutely sure before deleting your account"),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that opens the second modal and deletes the account", async () => {
    const deleteButton1 = screen.getByText("DELETE ACCOUNT");
    fireEvent.click(deleteButton1);
    expect(screen.getByText("We're sorry to see you go")).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    expect(passwordInput).toHaveValue("123456789");
    const userNameInput = screen.getByPlaceholderText("USERNAME");
    fireEvent.change(userNameInput, { target: { value: "aaaa" } });
    expect(userNameInput).toHaveValue("aaaa");
    const checkBox = screen.getByRole("checkbox");
    fireEvent.click(checkBox);
    const deleteButton2 = screen.getByText("DELETE");
    fireEvent.click(deleteButton2);
    //expect(false).toBe(true);
  });
});
