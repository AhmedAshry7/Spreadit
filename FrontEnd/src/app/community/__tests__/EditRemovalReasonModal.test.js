import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import EditRemovalReasonModal from "@/app/community/[communityName]/moderation/rulesandremoval/EditRemovalReasonModal";

describe("EditRemovalReasonModal", () => {
  const props = {
    close: console.log("close"),
    title: "InappropriateContent",
    message: "Yourposthasbeenremoved",
    communityName: "Community",
    id: "1",
  };

  it("renders the modal with correct title and message", async () => {
    const { getByPlaceholderText } = render(
      <EditRemovalReasonModal {...props} />,
    );

    expect(getByPlaceholderText(" Removal reason title ")).toHaveValue(
      props.title,
    );
    expect(getByPlaceholderText(" Write a message to the user ")).toHaveValue(
      props.message,
    );
  });

  it("allows editing title and message", async () => {
    const { getByPlaceholderText } = render(
      <EditRemovalReasonModal {...props} />,
    );
    const titleInput = getByPlaceholderText(" Removal reason title ");
    const messageInput = getByPlaceholderText(" Write a message to the user ");

    fireEvent.change(titleInput, { target: { value: "NewTitle" } });
    fireEvent.change(messageInput, { target: { value: "Newmessage" } });

    expect(titleInput).toHaveValue("NewTitle");
    expect(messageInput).toHaveValue("Newmessage");
  });

  it("displays error messages for invalid input lengths", async () => {
    const { getByPlaceholderText, getByText } = render(
      <EditRemovalReasonModal {...props} />,
    );
    const titleInput = getByPlaceholderText(" Removal reason title ");

    fireEvent.change(titleInput, { target: { value: "a".repeat(60) } });

    expect(
      getByText("Input length of 61 exceeds maximum length of 50"),
    ).toBeInTheDocument();
  });

  it("calls close function when cancel button is clicked", async () => {
    const { getByText } = render(<EditRemovalReasonModal {...props} />);
    const cancelButton = getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(closeMock).toHaveBeenCalledTimes(1);
  });

  // This test assumes that you have mocked the API request functions appropriately.
  it("calls delete and update functions when buttons are clicked", async () => {
    // Mock your API functions here
    const deleteMock = jest.fn();
    const updateMock = jest.fn();

    const { getByText } = render(
      <EditRemovalReasonModal
        {...props}
        deleteRemovalReason={deleteMock}
        editRemovalReason={updateMock}
      />,
    );
    const deleteButton = getByText("Delete");

    fireEvent.click(deleteButton);

    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});
