import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Wrapper from "../Wrapper";

describe("Wrapper component", () => {
  it("should call onClose when Escape key is pressed", () => {
    const onCloseMock = jest.fn();
    const { container } = render(
      <Wrapper isOpen={true} onClose={onCloseMock} addFunc={() => {}} />,
    );
    fireEvent.keyDown(container, { key: "Escape" });
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should handle arrow key navigation", () => {
    const { container } = render(
      <Wrapper isOpen={true} onClose={() => {}} addFunc={() => {}} />,
    );
    const focusableElement1 = container.appendChild(
      document.createElement("button"),
    );
    const focusableElement2 = container.appendChild(
      document.createElement("button"),
    );
    const focusableElement3 = container.appendChild(
      document.createElement("button"),
    );
    focusableElement1.classList.add("focusable");
    focusableElement2.classList.add("focusable");
    focusableElement3.classList.add("focusable");

    focusableElement1.focus();
    fireEvent.keyDown(container, { key: "ArrowDown" });
    expect(document.activeElement).toEqual(focusableElement2);

    fireEvent.keyDown(container, { key: "ArrowDown" });
    expect(document.activeElement).toEqual(focusableElement3);

    fireEvent.keyDown(container, { key: "ArrowDown" });
    expect(document.activeElement).toEqual(focusableElement1);
  });
});
