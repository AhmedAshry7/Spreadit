import React from "react";
import { render } from "@testing-library/react";
import FormInfo from "../FormInfo";
import "@testing-library/jest-dom";

describe("Form Info component", () => {
  it("renders Component correctly", () => {
    const { getByText, getByAltText } = render(
      <FormInfo title="Test" description="Desc" />,
    );
    const img = getByAltText("Spreadit Logo.");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src");
    expect(getByText("Test")).toBeInTheDocument();
    expect(getByText("Desc")).toBeInTheDocument();
    expect;
  });
});
