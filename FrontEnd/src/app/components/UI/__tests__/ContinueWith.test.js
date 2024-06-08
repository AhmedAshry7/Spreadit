import React from "react";
import { getByRole, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContinueWith from "../ContinueWith";
import "@testing-library/jest-dom";

describe("ContinueWith component", () => {
  it("calls handleGoogleSignIn when the submit button is pressed", async () => {
    const handleGoogleSignInMock = jest.fn();
    const { getByText } = render(
      <ContinueWith handleGoogleSignIn={handleGoogleSignInMock} />,
    );
    const btn = getByText("Sign in with Google");
    await userEvent.click(btn);
    expect(handleGoogleSignInMock).toHaveBeenCalledTimes(1);
  });
});
