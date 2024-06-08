import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileIcon from "../ProfileIcon";

describe("ProfileIcon Component", () => {
  test("renders correctly", () => {
    const url = "/app/assets/awwpfp.jpg";

    render(<ProfileIcon url={url} />);

    //check if the profile icon is rendered
    const profileIcon = screen.getByAltText("Profile icon");
    expect(profileIcon).toBeInTheDocument();

    //check if the profile icon has the correct width and height
    expect(profileIcon).toHaveAttribute("width", "35");
    expect(profileIcon).toHaveAttribute("height", "35");
  });
});
