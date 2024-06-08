import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import BannedModal from "../[communityName]/moderation/(UserManagement)/banned/BanModal";

describe("Approved Modal", () => {
  const setShowModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal correctly", () => {
    const { getByText, getAllByText } = render(
      <BannedModal setShowModal={setShowModal} />,
    );
    expect(getByText("Ban a User")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Ban User")).toBeInTheDocument();
  });

  test("closes the modal", () => {
    render(<BannedModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(setShowModal).toHaveBeenCalledTimes(1);
    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  test("updates the username", () => {
    render(<BannedModal setShowModal={setShowModal} />);
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "test" },
    });
    expect(screen.getByLabelText("Username").value).toBe("test");
  });

  test("Add Mod Note", () => {
    render(<BannedModal setShowModal={setShowModal} />);
    fireEvent.change(screen.getByLabelText("Note"), {
      target: { value: "test" },
    });
    expect(screen.getByLabelText("Note").value).toBe("test");
  });

  test("Increase Days", () => {
    render(<BannedModal setShowModal={setShowModal} />);
    fireEvent.change(screen.getByTestId("count"), { target: { value: 1 } });
    expect(screen.getByTestId("count").value).toBe("1");
  });

  test("Make Permanent", () => {
    render(<BannedModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByTestId("permanent"));
    expect(screen.getByTestId("permanent").checked).toBe(true);
  });
});
