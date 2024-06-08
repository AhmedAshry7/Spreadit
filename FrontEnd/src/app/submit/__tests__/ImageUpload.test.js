import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ImageUpload from "../ImageUpload";

describe("ImageUpload component", () => {
  test("renders component", () => {
    render(<ImageUpload inputRef={null} handleImageUpload={() => {}} />);
  });

  test("calls handleImageUpload function on file selection", () => {
    const handleImageUploadMock = jest.fn();
    const { getByLabelText } = render(
      <ImageUpload inputRef={null} handleImageUpload={handleImageUploadMock} />,
    );

    const input = getByLabelText("Upload");
    fireEvent.change(input, {
      target: {
        files: [
          new File(["dummyImageContent"], "image.jpg", { type: "image/jpeg" }),
        ],
      },
    });

    expect(handleImageUploadMock).toHaveBeenCalled();
    expect(handleImageUploadMock).toHaveBeenCalledWith(expect.any(Object));
  });
});
