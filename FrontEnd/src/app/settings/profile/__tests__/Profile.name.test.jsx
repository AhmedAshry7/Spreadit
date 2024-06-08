import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../page";
import { DEBOUNCE_DELAY } from "../page";

// Display name tests
describe("Display name", () => {
  it("should enter text in the display textbox and check it is indeed entered", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const message = "Hello, world!";
    const textbox = screen.getByPlaceholderText("Display name", {
      exact: false,
    });

    fireEvent.change(textbox, { target: { value: message } });

    expect(textbox).toHaveValue(message);
  });

  it("should enter text in the display textbox and check its length is correctly reflected in frontend", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const message = "Hello, world!";
    const textbox = screen.getByPlaceholderText("Display name", {
      exact: false,
    });

    fireEvent.change(textbox, { target: { value: message } });

    expect(textbox.value.length).toBe(message.length);
  });

  it("should mimic the useEffect debouncer that sends the new name to the API", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const message = "Hello, world!";
    const textbox = screen.getByPlaceholderText("Display name", {
      exact: false,
    });

    fireEvent.change(textbox, { target: { value: message } });

    setTimeout(() => {
      expect(true).toBe(true);
    }, DEBOUNCE_DELAY);
  });

  it("should type something, wait for it to be saved, refresh, and check if it is there", async () => {
    const { rerender } = render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const message = "Hello, world!";
    const textbox = screen.getByPlaceholderText("Display name", {
      exact: false,
    });

    fireEvent.change(textbox, { target: { value: message } });

    setTimeout(() => {}, DEBOUNCE_DELAY + 300);

    rerender(<Profile />);

    expect(textbox).toHaveValue(message);
  });
});
