import { render, screen, fireEvent } from "@testing-library/react";
import DeletePostModal from "../DeletePostModal";

describe("DeletePostModal component", () => {
  it("renders correctly", () => {
    render(<DeletePostModal closeModal={() => {}} onDelete={() => {}} />);

    expect(screen.getByText("Delete post?")).toBeInTheDocument();

    expect(screen.getByText("Go Back")).toBeInTheDocument();

    expect(screen.getByText("Yes, Delete")).toBeInTheDocument();
  });

  it("calls closeModal when (Go Back) button is clicked", () => {
    const closeModalMock = jest.fn();
    render(<DeletePostModal closeModal={closeModalMock} />);

    fireEvent.click(screen.getByText("Go Back"));

    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });

  it("calls closeModal and onDelete when (Yes, Delete) button is clicked", () => {
    const closeModalMock = jest.fn();
    const onDeleteMock = jest.fn();
    render(
      <DeletePostModal closeModal={closeModalMock} onDelete={onDeleteMock} />,
    );

    fireEvent.click(screen.getByText("Yes, Delete"));

    expect(closeModalMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
