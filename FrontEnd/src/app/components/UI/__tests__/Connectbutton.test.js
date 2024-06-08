jest.mock("../../assets/mailimage.png", () => ({
  width: 100,
  heigth: 100,
}));
jest.mock("../../assets/Google.png", () => ({
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
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Connectbutton from "../Connectbutton";
import { expect } from "@jest/globals";

describe("The connect button tests", () => {
  beforeEach(() => {
    render(
      <Connectbutton
        type="Google"
        description="Connect to Google"
        condition={true}
      />,
    );
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("(disconnect)")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it opens modal when button is clicked", () => {
    const connectButton = screen.getByText("(disconnect)");
    fireEvent.click(connectButton);
    expect(
      screen.getByText("To continue, confirm your password."),
    ).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it shows error when password input is less than 8 characters", async () => {
    const disconnectButton = screen.getByText("(disconnect)");
    fireEvent.click(disconnectButton);
    expect(
      screen.getByText("To continue, confirm your password."),
    ).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    expect(passwordInput).toHaveValue("12345");
    const disconnectButton2 = screen.getByText("Disconnect");
    fireEvent.click(disconnectButton2);
    expect(
      screen.getByText("Password must be at least 8 characters long."),
    ).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it doesn't show error when password input is correct", async () => {
    const disconnectButton = screen.getByText("(disconnect)");
    fireEvent.click(disconnectButton);
    expect(
      screen.getByText("To continue, confirm your password."),
    ).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText("PASSWORD");
    fireEvent.change(passwordInput, { target: { value: "123456789" } });
    expect(passwordInput).toHaveValue("123456789");
    const disconnectButton2 = screen.getByText("Disconnect");
    fireEvent.click(disconnectButton2);
    expect(
      screen.queryByText("Password must be at least 8 characters long."),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("closes when X button is clicked", async () => {
    const disconnectButton = screen.getByText("(disconnect)");
    fireEvent.click(disconnectButton);
    const xButton = screen.getByText("X");
    fireEvent.click(xButton);
    expect(
      screen.queryByText("To continue, confirm your password."),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("closes when cancel button is clicked", async () => {
    const disconnectButton = screen.getByText("(disconnect)");
    fireEvent.click(disconnectButton);
    const cancelButton = screen.getByText("CANCEL");
    fireEvent.click(cancelButton);
    expect(
      screen.queryByText("To continue, confirm your password."),
    ).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });
});
