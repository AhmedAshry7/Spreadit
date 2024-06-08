import { render, screen, fireEvent } from "@testing-library/react";
import HiddenPost from "../HiddenPost";

describe("HiddenPost component", () => {
  it("renders correctly", () => {
    render(<HiddenPost />);

    expect(screen.getByText("Post hidden")).toBeInTheDocument();

    expect(screen.getByText("Undo")).toBeInTheDocument();
  });

  it("calls unHide when Undo button is clicked", () => {
    const unHideMock = jest.fn();
    render(<HiddenPost unHide={unHideMock} />);

    fireEvent.click(screen.getByText("Undo"));

    expect(unHideMock).toHaveBeenCalledTimes(1);
  });
});
