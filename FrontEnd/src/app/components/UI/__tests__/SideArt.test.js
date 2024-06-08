import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SideArt from "../SideArt";
import "@testing-library/jest-dom";

describe("Side Art component", () => {
  it("should get image by alt", () => {
    render(<SideArt alt="Alt Text" />);
    const image = screen.getByAltText("Alt Text");
    expect(image).toBeInTheDocument();
  });
});
