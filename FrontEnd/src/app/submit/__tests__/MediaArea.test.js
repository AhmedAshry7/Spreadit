import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MediaArea from "../MediaArea";

URL.createObjectURL = jest.fn();
const handleImageUploadMock = jest.fn();

describe("MediaArea component", () => {
  test("renders 1st form of component", () => {
    render(<MediaArea mediaArray={[]} setMediaArray={() => {}} />);

    const uploadButton = screen.getByLabelText("Upload");
    expect(uploadButton).toBeInTheDocument();

    // Since there are no media items, the ImageUpload component should be rendered
    const imageUploadSection = screen.queryByText("Drag and drop images or");
    expect(imageUploadSection).toBeInTheDocument();
  });

  test("renders 2nd form of component", () => {
    const dummyImageFile = new File(["dummyImageContent"], "image.jpg", {
      type: "image/jpeg",
    });

    render(
      <MediaArea mediaArray={[dummyImageFile]} setMediaArray={() => {}} />,
    );
  });

  test("allows uploading images and videos", () => {
    const dummyImageFile = new File(["dummyImageContent"], "image.jpg", {
      type: "image/jpeg",
    });

    const { getByTestId } = render(
      <MediaArea mediaArray={[dummyImageFile]} setMediaArray={() => {}} />,
    );

    // Find the upload button using the data-testid attribute
    const uploadButton = getByTestId("upload-button");

    // Simulate a change event to upload the dummy image file
    fireEvent.change(uploadButton, {
      target: {
        files: [dummyImageFile], // Pass the dummy image file to the event
      },
    });

    expect(handleImageUploadMock).toHaveBeenCalled();
  });

  test("allows deleting media items", () => {
    const mockMediaArray = [
      new File(["dummyImageContent"], "image.jpg", { type: "image/jpeg" }),
      new File(["dummyVideoContent"], "video.mp4", { type: "video/mp4" }),
    ];
    const setMediaArray = jest.fn();

    render(
      <MediaArea mediaArray={mockMediaArray} setMediaArray={setMediaArray} />,
    );

    const deleteButtons = getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[0]);

    expect(setMediaArray).toHaveBeenCalled();
  });
});
