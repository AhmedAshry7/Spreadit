jest.mock("../../assets/mailimage.png", () => ({
  width: 100,
  heigth: 100,
}));

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ImagePreview from "../ImagePreview";

describe("The ImagePreview component tests", () => {
  const imageUrl = "../../assets/mailimage.png";
  const onDeleteMock = jest.fn();

  test("renders image preview correctly", () => {
    const { getByAltText } = render(
      <ImagePreview imageUrl={imageUrl} onDelete={onDeleteMock} />,
    );

    // Check if the image with the provided imageUrl is rendered
    const imageElement = getByAltText("preview image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", imageUrl);
  });

  test("calls onDelete function when delete button is clicked", () => {
    const { getByText } = render(
      <ImagePreview imageUrl={imageUrl} onDelete={onDeleteMock} />,
    );

    // Simulate click on the delete button
    fireEvent.click(getByText("X"));

    // Check if onDelete function is called
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
