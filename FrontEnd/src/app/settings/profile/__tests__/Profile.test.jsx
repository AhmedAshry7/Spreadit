import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../page";
import OutlineButton from "@/app/components/UI/OutlineButton";
import { DEBOUNCE_DELAY } from "../page";

describe("Profile component", () => {
  it("renders loading indicator initially", async () => {
    render(<Profile />);

    const loadingElement = screen.getByText("Loading", { exact: false });

    expect(loadingElement).toBeInTheDocument();
  });

  it("renders NSFW choice (derived from options.js for this phase, will be from API later) after loading", async () => {
    render(<Profile />);

    await screen.findByText("Loading", { exact: false });

    const nsfwElement = screen.getByText("NSFW");

    expect(nsfwElement).toBeInTheDocument();
  });

  it('should detect when "Clear History" button is clicked', async () => {
    const onClickMock = jest.fn();

    render(
      <OutlineButton
        btnClick={onClickMock}
        disabled={false}
        children={"Clear History"}
      />,
    );

    const clearButton = await screen.getByText("Clear History", {
      selector: "button",
    });

    fireEvent.click(clearButton);

    expect(onClickMock).toHaveBeenCalled();
  });
});
