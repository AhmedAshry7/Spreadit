import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AvatarArea from "../AvatarArea";
import styles from "../AvatarArea.module.css";

describe("AvatarArea component", () => {
  it("displays placeholder content before image upload", () => {
    const { getByText } = render(<AvatarArea />);

    const findText = (content, element) => {
      return (
        element.textContent === content &&
        element.tagName.toLowerCase() === "span"
      );
    };

    expect(
      getByText((content, element) =>
        findText("Drag and Drop or Upload Avatar Image", element),
      ),
    ).toBeInTheDocument();
  });

  it("displays uploaded image after image upload", async () => {
    const { getByAltText, getByClassName } = render(<AvatarArea />);
    const file = new File(["test"], "avatar.png", { type: "image/png" });
    const input = document.getElementsByClassName("acceptinput")[0];
    fireEvent.change(input, { target: { files: [file] } });
    const uploadedImage = getByAltText("Uploaded Avatar");
    expect(uploadedImage).toBeInTheDocument();
  });

  it("calls setAvatarUrl with correct URL after image upload", () => {
    const setAvatarUrlMock = jest.fn();
    const { getByTestId } = render(
      <AvatarArea setAvatarUrl={setAvatarUrlMock} />,
    );
    const file = new File(["test"], "avatar.png", { type: "image/png" });
    const input = document.getElementsByClassName("acceptinput")[0];

    // Simulate image upload
    fireEvent.change(input, { target: { files: [file] } });

    // Check if setAvatarUrl is called with correct URL
    expect(setAvatarUrlMock).toHaveBeenCalledWith(expect.any(String));
  });
});
