import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentInput from "../CommentInput";

URL.createObjectURL = jest.fn(() => "mockImageUrl");

describe("The Comment Input tests", () => {
  let onCommentMock;
  let closeMock;

  beforeEach(() => {
    onCommentMock = jest.fn();
    closeMock = jest.fn();

    render(
      <CommentInput
        onComment={onCommentMock}
        close={closeMock}
        commentBody=""
        commentImage=""
        buttonDisplay="comment"
        isPost={false}
      />,
    );
  });

  test("checks it renders correctly with default values", () => {
    expect(
      screen.getByPlaceholderText("write your comment here"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("comment")).toBeInTheDocument();
  });

  test("checks uploading and previewing an image", async () => {
    const input = screen.getByTestId("file-input");
    const imageIcon = screen.getByAltText("image icon");

    // Mock the file object
    const testFile = new File(["(⌐□_□)"], "test.png", {
      type: "image/png",
      lastModified: new Date().getTime(),
    });

    // Create a mock event object
    const mockEvent = {
      target: {
        files: [testFile],
      },
    };

    // Trigger the image change event
    fireEvent.change(input, mockEvent);

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByAltText("Uploaded")).toBeInTheDocument();
      expect(imageIcon).toHaveClass("disabled");
    });

    // Check the image file
    expect(input.files[0].name).toBe("test.png");

    // Check if setImageURL is called with a valid URL
    expect(URL.createObjectURL).toHaveBeenCalledWith(testFile);
  });

  test("checking comment submission correctly", () => {
    const addButton = screen.getByText("comment");
    const input = screen.getByPlaceholderText("write your comment here");

    fireEvent.change(input, {
      target: { innerHTML: "This is a test comment" },
    });
    fireEvent.click(addButton);

    expect(onCommentMock).toHaveBeenCalledWith({
      content: "This is a test comment",
      attachments: [],
    });
    // Expect the innerHTML to be cleared after the comment is submitted
    //expect(input.innerHTML).toBe('');
  });

  test(" checking it displays discard modal when cancelling with content", () => {
    const input = screen.getByPlaceholderText("write your comment here");
    fireEvent.change(input, {
      target: { innerHTML: "This is a test comment" },
    });

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.getByText("Discard comment?")).toBeInTheDocument();

    const discardButton = screen.getByText("Discard");
    fireEvent.click(discardButton);

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  test(" checking it closes modal when clicking cancel in discard modal", () => {
    const input = screen.getByPlaceholderText("write your comment here");
    fireEvent.change(input, {
      target: { innerHTML: "This is a test comment" },
    });

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.getByText("Discard comment?")).toBeInTheDocument();

    const cancelModalButton = screen.getByTestId("cancelmodal");
    fireEvent.click(cancelModalButton);

    expect(screen.queryByText("Discard comment?")).not.toBeInTheDocument();
  });

  test("checking it doesn't open discard modal when clicking cancel without content", () => {
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Discard comment?")).not.toBeInTheDocument();
  });
});
