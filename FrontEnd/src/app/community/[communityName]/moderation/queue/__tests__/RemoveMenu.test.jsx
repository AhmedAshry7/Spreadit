import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RemoveMenu from "../RemoveMenu";

describe("RemoveMenu component", () => {
  const onCloseMock = jest.fn();
  const removeFunctionMock = jest.fn();
  const testProps = {
    onClose: onCloseMock,
    removeFunction: removeFunctionMock,
    title: "Test Title",
    postId: "123",
    communityName: "test_community",
  };

  test("renders without crashing", () => {
    render(<RemoveMenu {...testProps} />);
  });

  test("renders the correct content", () => {
    const { getByText } = render(<RemoveMenu {...testProps} />);
    expect(getByText("Add Removal Reason")).toBeInTheDocument();
    expect(getByText("Confirm")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const { getByText } = render(<RemoveMenu {...testProps} />);
    fireEvent.click(getByText("✖"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("calls removeFunction with correct parameters when Confirm button is clicked", () => {
    const { getByText } = render(<RemoveMenu {...testProps} />);
    fireEvent.click(getByText("Confirm"));
    expect(removeFunctionMock).toHaveBeenCalledWith(
      testProps.title,
      "None",
      testProps.postId,
    );
  });
});
