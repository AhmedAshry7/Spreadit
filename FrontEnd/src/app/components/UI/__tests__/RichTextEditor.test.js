import { render, screen, fireEvent } from "@testing-library/react";
import RichTextEditor from "../RichTextEditor"; // Adjust the path as needed

describe("RichTextEditor", () => {
  test("should have a testid attribute for the contenteditable div", () => {
    const { getByTestId } = render(
      <RichTextEditor
        setContent={() => {}}
        setRawContent={() => {}}
        setMediaArray={() => {}}
      />,
    );

    const contentEditableDiv = getByTestId("draftjs-content");

    expect(contentEditableDiv).toBeInTheDocument();
  });

  test("renders MediaArea when clicking the image icon", () => {
    // Render the RichTextEditor component
    const { getByTestId, getByText, queryByTestId } = render(
      <RichTextEditor
        setContent={() => {}}
        setRawContent={() => {}}
        setMediaArray={() => {}}
        mediaArray={[]}
      />,
    );

    // Ensure MediaArea is not rendered initially
    expect(queryByTestId("media-area")).toBeNull();

    // Find the 📷 emoji and click it
    const imageEmoji = getByText("📷");
    fireEvent.click(imageEmoji);

    // Check if MediaArea is rendered after clicking the 📷 emoji
    expect(getByTestId("media-area")).toBeInTheDocument();
  });

  test("typing in the editor should update the content", () => {
    const setContent = jest.fn(); // Mock setContent function
    const setRawContent = jest.fn(); // Mock setRawContent function
    const setMediaArray = jest.fn(); // Mock setMediaArray function

    const { getByTestId } = render(
      <RichTextEditor
        setContent={setContent}
        setRawContent={setRawContent}
        setMediaArray={setMediaArray}
      />,
    );

    const editorComponent = getByTestId("draftjs-content").querySelector(
      ".public-DraftEditor-content",
    );

    // Simulate typing by directly calling the onChange function prop
    fireEvent.change(editorComponent, { target: { value: "Hello, world!" } });

    // Check if setContent function is called with the typed text
    expect(setContent).toHaveBeenCalledWith("Hello, world!");
  });

  test('clicking the "B" icon should apply selected style to the button', () => {
    const { getByText } = render(
      <RichTextEditor
        setContent={() => {}}
        setRawContent={() => {}}
        setMediaArray={() => {}}
        mediaArray={[]}
      />,
    );

    // Find the "B" icon button by its text content
    const boldIconButton = getByText("B");

    // Get the computed style of the button before clicking it
    const computedStyleBeforeClick = window.getComputedStyle(boldIconButton);

    // Get the color property from the computed style before clicking
    const colorBeforeClick = computedStyleBeforeClick.getPropertyValue("color");

    // Simulate a click event on the "B" icon button
    fireEvent.click(boldIconButton);

    // Get the updated computed style after the click event
    const computedStyleAfterClick = window.getComputedStyle(boldIconButton);

    // Get the updated color property after clicking
    const colorAfterClick = computedStyleAfterClick.getPropertyValue("color");

    // Check if the color has changed after clicking the button
    expect(colorAfterClick).not.toBe(colorBeforeClick);
  });
});
