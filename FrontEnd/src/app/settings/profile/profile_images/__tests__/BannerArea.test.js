import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BannerArea from "../BannerArea";
import styles from "../BannerArea.module.css";

describe("BannerArea component", () => {
  it("displays placeholder content before image upload", () => {
    const { getByText } = render(<BannerArea />);

    const findText = (content, element) => {
      return (
        element.textContent === content &&
        element.tagName.toLowerCase() === "span"
      );
    };

    expect(
      getByText((content, element) =>
        findText("Drag and Drop or Upload Banner Image", element),
      ),
    ).toBeInTheDocument();
  });

  it("displays uploaded image after image upload", async () => {
    const { getByAltText, getByClassName } = render(<BannerArea />);
    const file = new File(["test"], "Banner.png", { type: "image/png" });
    const input = document.getElementsByClassName("acceptinput")[0];
    fireEvent.change(input, { target: { files: [file] } });
    const uploadedImage = getByAltText("Uploaded Banner");
    expect(uploadedImage).toBeInTheDocument();
  });

  it("calls setBannerUrl with correct URL after image upload", () => {
    const setBannerUrlMock = jest.fn();
    const { getByTestId } = render(
      <BannerArea setBannerUrl={setBannerUrlMock} />,
    );
    const file = new File(["test"], "Banner.png", { type: "image/png" });
    const input = document.getElementsByClassName("acceptinput")[0];

    // Simulate image upload
    fireEvent.change(input, { target: { files: [file] } });

    // Check if setBannerUrl is called with correct URL
    expect(setBannerUrlMock).toHaveBeenCalledWith(expect.any(String));
  });
});
