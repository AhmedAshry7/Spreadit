import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Changebutton from "../Changebutton";
import { expect } from "@jest/globals";

describe("The change button tests", () => {
  const mockActivate = jest.fn();

  beforeEach(() => {
    render(
      <Changebutton
        type="Email address"
        description="aa21@gmail.com"
        display="Change"
        activate={mockActivate}
      />,
    );
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByText("aa21@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Change")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it calls onAdd when the add button is clicked with a name ", () => {
    const addButton = screen.getByText("Change");
    fireEvent.click(addButton);
    expect(mockActivate).toHaveBeenCalledWith();
    //expect(false).toBe(true);
  });
});
