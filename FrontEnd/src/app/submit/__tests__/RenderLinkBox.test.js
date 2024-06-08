import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RenderLinkBox from "../RenderLinkBox";

describe("RenderLinkBox component", () => {
  test("updates the url when typing in the textarea", () => {
    const setUrl = jest.fn();

    render(<RenderLinkBox url="" setUrl={setUrl} />);

    const textarea = screen.getByPlaceholderText("Url");
    fireEvent.change(textarea, { target: { value: "https://example.com" } });

    expect(setUrl).toHaveBeenCalledWith("https://example.com");
  });

  test("does not add a new line when pressing the Enter key", () => {
    const setUrl = jest.fn();

    render(<RenderLinkBox url="" setUrl={setUrl} />);

    const textarea = screen.getByPlaceholderText("Url");
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(setUrl).not.toHaveBeenCalled();
  });
});
