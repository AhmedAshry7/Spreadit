import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InviteModal from "../[communityName]/moderation/(UserManagement)/moderators/InviteModeratorModal";

describe("Invite Moderator Modal", () => {
  const setShowModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal correctly", () => {
    const { getByText, getAllByText } = render(
      <InviteModal setShowModal={setShowModal} />,
    );
    expect(getByText("Cancel")).toBeInTheDocument();
    expect(getByText("Everything")).toBeInTheDocument();
    expect(getByText("Manage Users")).toBeInTheDocument();
    expect(getByText("Manage Settings")).toBeInTheDocument();
    expect(getByText("Manage Posts & Comments")).toBeInTheDocument();
  });

  test("click on Everything and disable it", () => {
    render(<InviteModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByTestId("everything"));
    expect(screen.getByTestId("everything").checked).toBe(false);
    expect(screen.getByTestId("users").checked).toBe(false);
    expect(screen.getByTestId("settings").checked).toBe(false);
    expect(screen.getByTestId("posts").checked).toBe(false);
  });

  test("click on Manage Users", () => {
    render(<InviteModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByTestId("everything"));
    fireEvent.click(screen.getByTestId("users"));
    expect(screen.getByTestId("users").checked).toBe(true);
  });

  test("click on Manage Settings", () => {
    render(<InviteModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByTestId("everything"));
    fireEvent.click(screen.getByTestId("settings"));
    expect(screen.getByTestId("settings").checked).toBe(true);
  });

  test("click on Manage Posts & Comments", () => {
    render(<InviteModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByTestId("everything"));
    fireEvent.click(screen.getByTestId("posts"));
    expect(screen.getByTestId("posts").checked).toBe(true);
  });

  test("isEdit is true", () => {
    render(
      <InviteModal
        setShowModal={setShowModal}
        isEdit={true}
        usernameProp="test"
      />,
    );
    expect(screen.getByText("Edit:test")).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  test("closes the modal", () => {
    render(<InviteModal setShowModal={setShowModal} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(setShowModal).toHaveBeenCalledTimes(1);
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
});
