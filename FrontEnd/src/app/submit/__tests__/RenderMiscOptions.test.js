import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RenderMiscOptions from "../RenderMiscOptions";

describe("RenderMiscOptions component", () => {
  test('toggles the spoiler state when "Spoiler" button is clicked', () => {
    const setSpoiler = jest.fn();
    const setNsfw = jest.fn();
    const nsfw = false;
    const spoiler = false;

    render(
      <RenderMiscOptions
        setSpoiler={setSpoiler}
        setNsfw={setNsfw}
        nsfw={nsfw}
        spoiler={spoiler}
        ready={true}
        createPost={() => {}}
      />,
    );

    const spoilerButton = screen.getByLabelText("Mark as a spoiler");
    fireEvent.click(spoilerButton);

    expect(setSpoiler).toHaveBeenCalledWith(true);
  });

  test('toggles the NSFW state when "NSFW" button is clicked', () => {
    const setSpoiler = jest.fn();
    const setNsfw = jest.fn();
    const nsfw = false;
    const spoiler = false;

    render(
      <RenderMiscOptions
        setSpoiler={setSpoiler}
        setNsfw={setNsfw}
        nsfw={nsfw}
        spoiler={spoiler}
        ready={true}
        createPost={() => {}}
      />,
    );

    const nsfwButton = screen.getByLabelText("Mark as Not Safe For Work");
    fireEvent.click(nsfwButton);

    expect(setNsfw).toHaveBeenCalledWith(true);
  });

  test('disables the "Post" button when ready prop is false', () => {
    const setSpoiler = jest.fn();
    const setNsfw = jest.fn();
    const nsfw = false;
    const spoiler = false;

    render(
      <RenderMiscOptions
        setSpoiler={setSpoiler}
        setNsfw={setNsfw}
        nsfw={nsfw}
        spoiler={spoiler}
        ready={false}
        createPost={() => {}}
      />,
    );

    const postButton = screen.getByText("Post");
    expect(postButton).toBeDisabled();
  });

  test('calls the createPost function when "Post" button is clicked', () => {
    const setSpoiler = jest.fn();
    const setNsfw = jest.fn();
    const nsfw = false;
    const spoiler = false;
    const createPost = jest.fn();

    render(
      <RenderMiscOptions
        setSpoiler={setSpoiler}
        setNsfw={setNsfw}
        nsfw={nsfw}
        spoiler={spoiler}
        ready={true}
        createPost={createPost}
      />,
    );

    const postButton = screen.getByText("Post");
    fireEvent.click(postButton);

    expect(createPost).toHaveBeenCalled();
  });

  test('doesnt call the createPost function when "Post" button is clicked if not ready', () => {
    const setSpoiler = jest.fn();
    const setNsfw = jest.fn();
    const nsfw = false;
    const spoiler = false;
    const createPost = jest.fn();

    render(
      <RenderMiscOptions
        setSpoiler={setSpoiler}
        setNsfw={setNsfw}
        nsfw={nsfw}
        spoiler={spoiler}
        ready={false}
        createPost={createPost}
      />,
    );

    const postButton = screen.getByText("Post");
    fireEvent.click(postButton);

    expect(createPost).not.toHaveBeenCalled();
  });
});
