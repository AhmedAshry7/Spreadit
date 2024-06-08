import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditCommunityModal from "../EditCommunityModal";

describe("EditCommunityModal Component", () => {
  const mockClose = jest.fn();

  test("renders correctly", () => {
    render(<EditCommunityModal close={mockClose} />);
    const modalTitle = screen.getByText("Edit community details widget");
    expect(modalTitle).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    const saveButton = screen.getByText("Save");
    expect(saveButton).toBeInTheDocument();
  });

  test("calls close function when cancel button is clicked", () => {
    render(<EditCommunityModal close={mockClose} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test("calls close function when save button is clicked", () => {
    render(<EditCommunityModal close={mockClose} />);
    fireEvent.click(screen.getByText("Save"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});
