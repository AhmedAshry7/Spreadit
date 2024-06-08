import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SocialLink from "../SocialLink";

describe("SocialLink component", () => {
  it("renders correctly", () => {
    const { getByText, getByRole } = render(
      <SocialLink name="Facebook" logo="facebook_logo.png" id={1} />,
    );

    expect(getByText("Facebook")).toBeInTheDocument();
    const imageElement = getByRole("img");
    expect(imageElement).toHaveAttribute("src", "facebook_logo.png");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <SocialLink
        name="Twitter"
        logo="twitter_logo.png"
        id={2}
        wasClicked={handleClick}
      />,
    );

    fireEvent.click(getByText("Twitter"));

    expect(handleClick).toHaveBeenCalledWith(2);
  });

  it("renders as a deletor if isDeletor prop is true", () => {
    const { getByText } = render(
      <SocialLink
        name="Delete"
        logo="delete_logo.png"
        id={3}
        isDeletor={true}
      />,
    );

    const deletorElement = getByText("Delete");
    expect(deletorElement).toHaveClass("buttonroundd");
  });

  it("does not render the logo if logo prop is not provided", () => {
    const { queryByRole } = render(<SocialLink name="Instagram" id={5} />);

    const imageElement = queryByRole("img");
    expect(imageElement).toBeNull();
  });
});
