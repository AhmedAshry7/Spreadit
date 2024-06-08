import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateCommunityModal from "../CreateCommunityModal";

describe("CreateCommunityModal Component", () => {
  const mockClose = jest.fn();

  test("renders correctly", () => {
    render(<CreateCommunityModal close={mockClose} />);

    //check if the modal title is rendered
    const modalTitle = screen.getByText("Create a community");
    expect(modalTitle).toBeInTheDocument();

    //check if the cancel and create buttons are rendered
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    const createButton = screen.getByText("Create your community");
    expect(createButton).toBeInTheDocument();
  });

  test("calls close function when cancel button is clicked", () => {
    render(<CreateCommunityModal close={mockClose} />);

    //check if the close function is called
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
  test("calls handleCreate function when create button is clicked", () => {
    render(<CreateCommunityModal close={mockClose} />);
    fireEvent.click(screen.getByText("Create your community"));
  });
});
