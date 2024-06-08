import React from "react";
import { render } from "@testing-library/react";
import PlusIcon from "../PlusIcon";

describe("PlusIcon component", () => {
  it("renders the plus icon with correct SVG elements and CSS classes", () => {
    const { container } = render(<PlusIcon />);
    const svgContainer = container.querySelector(".svgContainer");
    const circle = container.querySelector("circle");
    const path = container.querySelector("path");

    // Check if SVG container element is rendered
    expect(svgContainer).toBeInTheDocument();

    // Check if circle element is rendered with correct attributes
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute("cx", "18");
    expect(circle).toHaveAttribute("cy", "18");
    expect(circle).toHaveAttribute("r", "17.5");

    // Check if path element is rendered with correct attributes
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute("clip-rule", "evenodd");
    expect(path).toHaveAttribute("fill-rule", "evenodd");
  });

  it("applies the correct CSS classes to the SVG elements", () => {
    const { container } = render(<PlusIcon />);
    const svgContainer = container.querySelector(".svgContainer");
    const marginDiv = container.querySelector(".margin");

    // Check if correct CSS classes are applied to SVG container
    expect(svgContainer).toHaveClass("ColorSizing");

    // Check if correct CSS class is applied to the margin div
    expect(marginDiv).toHaveClass("margin");
  });
});
