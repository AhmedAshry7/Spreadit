import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PollCreator from "../PollCreator";

describe("PollCreator component", () => {
  test("renders options correctly", () => {
    const { getByPlaceholderText } = render(
      <PollCreator
        options={[
          { option: "Option 1", votes: 0 },
          { option: "Option 2", votes: 0 },
        ]}
      />,
    );
    expect(getByPlaceholderText("Option 1")).toBeInTheDocument();
    expect(getByPlaceholderText("Option 2")).toBeInTheDocument();
  });

  test("adds new option", () => {
    // Mock setOptions function
    const setOptions = jest.fn();

    // Render PollCreator component with initial options
    render(
      <PollCreator
        options={[
          { option: "Option 1", votes: 0 },
          { option: "Option 2", votes: 0 },
        ]}
        setOptions={setOptions} // Pass mock setOptions function as prop
      />,
    );

    // Click the "Add Option" button
    const addButton = screen.getByText("Add Option");
    fireEvent.click(addButton);

    // Check if setOptions was called with the correct arguments
    expect(setOptions).toHaveBeenCalledWith([
      { option: "Option 1", votes: 0 },
      { option: "Option 2", votes: 0 },
      { option: "", votes: 0 }, // New option added
    ]);

    // Check if the new option input field is rendered
    expect(screen.getByPlaceholderText("Option 3")).toBeInTheDocument();
  });

  test("deletes option", () => {
    const { queryByPlaceholderText, getByLabelText } = render(
      <PollCreator
        options={[
          { option: "Option 1", votes: 0 },
          { option: "Option 2", votes: 0 },
        ]}
      />,
    );
    const addButton = getByText("Add Option");
    const deleteButton = getByLabelText("Delete Option 1");
    fireEvent.click(deleteButton);
    expect(queryByPlaceholderText("Option 1")).not.toBeInTheDocument();
  });

  test("changes voting length", () => {
    const setLength = jest.fn();
    const { getByText } = render(
      <PollCreator length={1} setLength={setLength} />,
    );
    const votingLengthButton = getByText("1 Day");
    fireEvent.click(votingLengthButton);
    fireEvent.click(getByText("3 Days"));
    expect(setLength).toHaveBeenCalledWith(3);
  });

  test("disables add option button when maximum number of options is reached", () => {
    const options = [
      { option: "Option 1", votes: 0 },
      { option: "Option 2", votes: 0 },
      { option: "Option 3", votes: 0 },
      { option: "Option 4", votes: 0 },
      { option: "Option 5", votes: 0 },
      { option: "Option 6", votes: 0 },
    ];
    const { getByText } = render(<PollCreator options={options} />);
    const addButton = getByText("Add Option");
    fireEvent.click(addButton); // Try to add one more option
    expect(addButton).toBeDisabled();
  });
});
