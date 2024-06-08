import React from "react";
import { render, fireEvent, screen, us } from "@testing-library/react";
import RenderTitleBox from "../RenderTitleBox";

describe("RenderTitleBox component", () => {
  test("renders the component correctly with provided title", () => {
    const mockTitle = "Test Title";
    const mockSetTitle = jest.fn();

    render(<RenderTitleBox title={mockTitle} setTitle={mockSetTitle} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(`${mockTitle.length}/300`)).toBeInTheDocument();
  });

  test("updates the title when typing in the textarea", () => {
    const mockSetTitle = jest.fn();
    const newTitle = "New Title";

    render(<RenderTitleBox title="" setTitle={mockSetTitle} />);
    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: newTitle },
    });

    expect(mockSetTitle).toHaveBeenCalledWith(newTitle);
  });

  test("truncates the title if it exceeds the maximum character limit", () => {
    const mockSetTitle = jest.fn();
    const longTitle = "a".repeat(400); // Creating a title with more than 300 characters

    render(<RenderTitleBox title="" setTitle={mockSetTitle} />);

    const textarea = screen.getByPlaceholderText("Title");

    fireEvent.focus(textarea); // Simulate clicking on the textarea
    fireEvent.change(textarea, { target: { value: longTitle } }); // Simulate typing or pasting

    const truncatedTitle = longTitle.substring(0, 300);

    expect(textarea.value).toBe(truncatedTitle);
  });

  test("does not add a new line when pressing the Enter key", () => {
    const mockSetTitle = jest.fn();

    render(<RenderTitleBox title="" setTitle={mockSetTitle} />);
    fireEvent.keyDown(screen.getByPlaceholderText("Title"), {
      key: "Enter",
      code: "Enter",
    });

    expect(mockSetTitle).not.toHaveBeenCalled();
  });
});
