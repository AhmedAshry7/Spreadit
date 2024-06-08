import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CommunityImages from "../CommunityImages";

describe("CommunityImages component", () => {
  it("renders correctly", () => {
    const setAvatarMock = jest.fn();
    const setBannerMock = jest.fn();
    const { getByText } = render(
      <CommunityImages setAvatar={setAvatarMock} setBanner={setBannerMock} />,
    );
    expect(getByText("Avatar and banner image")).toBeInTheDocument();
    expect(getByText("Images must be .png or .jpg format")).toBeInTheDocument();
  });

  it("calls setAvatar and setBanner functions when AvatarArea and BannerArea components are interacted with", () => {
    const setAvatarMock = jest.fn();
    const setBannerMock = jest.fn();
    const { getByText } = render(
      <CommunityImages setAvatar={setAvatarMock} setBanner={setBannerMock} />,
    );

    // Simulate interacting with AvatarArea
    fireEvent.change(getByText("Upload Avatar"), {
      target: { files: ["avatar.png"] },
    });
    expect(setAvatarMock).toHaveBeenCalledTimes(1);

    // Simulate interacting with BannerArea
    fireEvent.change(getByText("Upload Banner"), {
      target: { files: ["banner.png"] },
    });
    expect(setBannerMock).toHaveBeenCalledTimes(1);
  });
});
