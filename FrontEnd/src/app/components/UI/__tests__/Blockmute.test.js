import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Blockmute from "../Blockmute";
import { expect } from "@jest/globals";

describe("The Blockmute tests", () => {
  const mockAdd = jest.fn();

  beforeEach(() => {
    render(
      <Blockmute
        type="Block"
        description="users blocked"
        inputmsg="Block new users"
        onAdd={mockAdd}
      />,
    );
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("Block")).toBeInTheDocument();
    expect(screen.getByText("users blocked")).toBeInTheDocument();
    expect(screen.getByText("Block new users")).toBeInTheDocument();
    expect(screen.getByText("ADD")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that it takes input", () => {
    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "common-winter" } });
    expect(input).toHaveValue("common-winter");
    //expect(false).toBe(true);
  });

  test("checking that it clears the value when the add button is clicked", () => {
    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "common-winter" } });
    expect(input).toHaveValue("common-winter");
    const addButton = screen.getByText("ADD");
    fireEvent.click(addButton);
    expect(input).toHaveValue("");
    //expect(false).toBe(true);
  });

  test("checking that it calls onAdd when the add button is clicked with a name ", () => {
    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "common-winter" } });
    expect(input).toHaveValue("common-winter");
    const addButton = screen.getByText("ADD");
    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith("common-winter");
    //expect(false).toBe(true);
  });

  test("checking that it doesn't call onAdd when the add button is clicked without a name ", () => {
    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "" } });
    const addButton = screen.getByText("ADD");
    fireEvent.click(addButton);
    expect(mockAdd).not.toHaveBeenCalledWith();
    //expect(false).toBe(true);
  });
});
