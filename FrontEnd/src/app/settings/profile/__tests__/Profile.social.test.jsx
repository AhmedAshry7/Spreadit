import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../page";
import { DEBOUNCE_DELAY } from "../page";

// About section tests
describe("Social links section", () => {
  it('should add a social link and verify it entered the add page by checking that "Spreadit" exists after a slight delay', async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });

    const socialLinkInput = screen.getByText("Spreadit");
    expect(screen.getByText("Spreadit")).toBeInTheDocument();
  });

  it("should add a social link that then gets rendered", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });

    const socialLinkInput = screen.getByText("Spreadit");
    fireEvent.click(socialLinkInput);

    const displayTextInput = screen.getByPlaceholderText("Display text");
    fireEvent.change(displayTextInput, { target: { value: "TestedLink" } });

    const urlInput = screen.getByPlaceholderText("insert url");
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    const finalCheck = await screen.findByText("TestedLink", {
      selector: "div > a > li",
    });
    expect(finalCheck).toBeInTheDocument();
  });

  it("should add a social link then deletes it", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });

    const socialLinkInput = screen.getByText("Spreadit");
    fireEvent.click(socialLinkInput);

    const displayTextInput = screen.getByPlaceholderText("Display text");
    fireEvent.change(displayTextInput, { target: { value: "TestedLink" } });

    const urlInput = screen.getByPlaceholderText("insert url");
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    const finalCheck = await screen.findByText("TestedLink", {
      selector: "div > a > li",
    });
    const deleteIcon = await screen.findByText("TestedLink", {
      selector: "div > li",
    });

    fireEvent.click(deleteIcon);

    expect(screen.queryByText("TestedLink")).not.toBeInTheDocument();
  });

  it("should verify it can add 5 links before button gets disabled", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    for (let i = 0; i < 5; i++) {
      const addButton = screen.getByText("Add social link");
      fireEvent.click(addButton);

      await screen.findByText("Custom URL", { exact: false });

      const socialLinkInput = screen.getByText("Spreadit");
      fireEvent.click(socialLinkInput);

      const displayTextInput = screen.getByPlaceholderText("Display text");
      fireEvent.change(displayTextInput, {
        target: { value: `TestedLink No${i}` },
      });
      const urlInput = screen.getByPlaceholderText("insert url");
      fireEvent.change(urlInput, { target: { value: "https://example.com" } });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);
    }

    const finalCheck = await screen.getByText("Add social link");

    fireEvent.click(finalCheck);

    expect(screen.queryByText("Custom URL")).not.toBeInTheDocument();
  });

  it("should add 5 links, hit the limit, then delete one and try adding one", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    for (let i = 0; i < 5; i++) {
      const addButton = screen.getByText("Add social link");
      fireEvent.click(addButton);

      await screen.findByText("Custom URL", { exact: false });

      const socialLinkInput = screen.getByText("Spreadit");
      fireEvent.click(socialLinkInput);

      const displayTextInput = screen.getByPlaceholderText("Display text");
      fireEvent.change(displayTextInput, {
        target: { value: `TestedLink No${i}` },
      });
      const urlInput = screen.getByPlaceholderText("insert url");
      fireEvent.change(urlInput, { target: { value: "https://example.com" } });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);
    }

    const deleteIcon = await screen.findByText("TestedLink No4", {
      selector: "div > li",
    });
    fireEvent.click(deleteIcon);

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });
    const socialLinkInput = screen.getByText("Spreadit");
    fireEvent.click(socialLinkInput);

    const displayTextInput = screen.getByPlaceholderText("Display text");
    fireEvent.change(displayTextInput, {
      target: { value: `TestedLinkFinal` },
    });
    const urlInput = screen.getByPlaceholderText("insert url");
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    const finalCheck = await screen.findByText("TestedLinkFinal", {
      selector: "div > a > li",
    });
    expect(finalCheck).toBeInTheDocument();
  });

  it("should add 5 links, delete all one by one, try adding just one (expecting error during deletion due to id bug))", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    for (let i = 0; i < 5; i++) {
      const addButton = screen.getByText("Add social link");
      fireEvent.click(addButton);

      await screen.findByText("Custom URL", { exact: false });

      const socialLinkInput = screen.getByText("Spreadit");
      fireEvent.click(socialLinkInput);

      const displayTextInput = screen.getByPlaceholderText("Display text");
      fireEvent.change(displayTextInput, {
        target: { value: `TestedLink No${i}` },
      });
      const urlInput = screen.getByPlaceholderText("insert url");
      fireEvent.change(urlInput, { target: { value: "https://example.com" } });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);
    }

    var deleteIcon = await screen.findByText("TestedLink No4", {
      selector: "div > li",
    });
    fireEvent.click(deleteIcon);

    console.log(
      `Will fail here because \`id\` was actually identical in all the links, so all of them were deleted after just one was deleted`,
    );
    console.log(
      `Thus it wont be able to find the next delete buttons. Also, \`counter\` decremented by just one after this step `,
    );

    deleteIcon = await screen.findByText("TestedLink No3", {
      selector: "div > li",
    });
    fireEvent.click(deleteIcon);

    deleteIcon = await screen.findByText("TestedLink No2", {
      selector: "div > li",
    });
    fireEvent.click(deleteIcon);

    deleteIcon = await screen.findByText("TestedLink No1", {
      selector: "div > li",
    });
    fireEvent.click(deleteIcon);

    deleteIcon = await screen.findByText("TestedLink No0", {
      selector: "div > li",
    });
    fireEvent.click(deleteIcon);

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });
    const socialLinkInput = screen.getByText("Spreadit");
    fireEvent.click(socialLinkInput);

    const displayTextInput = screen.getByPlaceholderText("Display text");
    fireEvent.change(displayTextInput, {
      target: { value: `TestedLinkFinal` },
    });
    const urlInput = screen.getByPlaceholderText("insert url");
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    const finalCheck = await screen.findByText("TestedLinkFinal", {
      selector: "div > a > li",
    });
    expect(finalCheck).toBeInTheDocument();
  });

  it("should add 5 links, delete all considering said bug, try adding just two (expecting error during deletion due to counter bug))", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    for (let i = 0; i < 5; i++) {
      const addButton = screen.getByText("Add social link");
      fireEvent.click(addButton);

      await screen.findByText("Custom URL", { exact: false });

      const socialLinkInput = screen.getByText("Spreadit");
      fireEvent.click(socialLinkInput);

      const displayTextInput = screen.getByPlaceholderText("Display text");
      fireEvent.change(displayTextInput, {
        target: { value: `TestedLink No${i}` },
      });
      const urlInput = screen.getByPlaceholderText("insert url");
      fireEvent.change(urlInput, { target: { value: "https://example.com" } });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);
    }

    var deleteIcon = await screen.findByText("TestedLink No4", {
      selector: "div > li",
    });
    fireEvent.click(deleteIcon);

    console.log(
      `Will fail in the 2nd iteration because \`id\` was actually identical in all the links, so all of them were deleted after just one was deleted`,
    );
    console.log(
      `Also, \`counter\` decremented by just one after this step, so the counter after the 1st iteration is actually \`5\` even though only one link exists`,
    );

    for (let i = 0; i < 2; i++) {
      const addButton = screen.getByText("Add social link");
      fireEvent.click(addButton);

      await screen.findByText("Custom URL", { exact: false });

      const socialLinkInput = screen.getByText("Spreadit");
      fireEvent.click(socialLinkInput);

      const displayTextInput = screen.getByPlaceholderText("Display text");
      fireEvent.change(displayTextInput, {
        target: { value: `TestedLinkFinal${i}` },
      });
      const urlInput = screen.getByPlaceholderText("insert url");
      fireEvent.change(urlInput, { target: { value: "https://example.com" } });

      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);
    }

    const finalCheck = await screen.findByText("TestedLinkFinal1", {
      selector: "div > a > li",
    });
    expect(finalCheck).toBeInTheDocument();
  });

  it("should enter the add social link modal and try to exit", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });
    const exitButton = document.getElementsByClassName("color-X")[0];

    fireEvent.click(exitButton);

    expect(screen.getByText("Add social link")).toBeInTheDocument();
  });

  it("should try to add a social link but change its mind and back out using the back arrow and exit buttons", async () => {
    render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });

    const socialLinkInput = screen.getByText("Spreadit");
    fireEvent.click(socialLinkInput);

    const displayTextInput = screen.getByPlaceholderText("Display text");
    fireEvent.change(displayTextInput, { target: { value: "TestedLink" } });

    const urlInput = screen.getByPlaceholderText("insert url");
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    const backButton = document.getElementsByClassName("color-X")[0];
    fireEvent.click(backButton);

    await screen.findByText("Custom URL", { exact: false });

    const exitButton = document.getElementsByClassName("color-X")[0];
    fireEvent.click(exitButton);

    expect(screen.getByText("Add social link")).toBeInTheDocument();
  });

  it("should add a social link then refresh the page to see if its still there as a result of api call", async () => {
    const { rerender } = render(<Profile />);
    await screen.findByText("Loading", { exact: false });

    const addButton = screen.getByText("Add social link");
    fireEvent.click(addButton);

    await screen.findByText("Custom URL", { exact: false });

    const socialLinkInput = screen.getByText("Spreadit");
    fireEvent.click(socialLinkInput);

    const displayTextInput = screen.getByPlaceholderText("Display text");
    fireEvent.change(displayTextInput, { target: { value: "TestedLink" } });

    const urlInput = screen.getByPlaceholderText("insert url");
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    rerender(<Profile />);

    const finalCheck = await screen.findByText("TestedLink", {
      selector: "div > a > li",
    });
    expect(finalCheck).toBeInTheDocument();
  });
});
