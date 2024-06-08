import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ApprovedModal from "../[communityName]/moderation/(UserManagement)/approved/ApprovedModal";

describe("Approved Modal", () => {
  const setShowModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal correctly", () => {
    const { getByText, getAllByText } = render(
      <ApprovedModal setShowModal={setShowModal} />,
    );
    expect(getAllByText("Approve User").length).toBe(2);
    expect(getByText("Enter Username")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  test("closes the modal", () => {
    render(<ApprovedModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(setShowModal).toHaveBeenCalledTimes(1);
    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  test("updates the username", () => {
    render(<ApprovedModal setShowModal={setShowModal} />);
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "test" },
    });
    expect(screen.getByLabelText("Username").value).toBe("test");
  });

  test("submits the form", () => {
    render(<ApprovedModal setShowModal={setShowModal} />);
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getAllByText("Approve User")[1]);
    expect(setShowModal).toHaveBeenCalledTimes(0);
  });

  test("disables the button", () => {
    render(<ApprovedModal setShowModal={setShowModal} />);
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "tes" },
    });
    expect(screen.getAllByText("Approve User")[1]).toBeDisabled();
  });
});
