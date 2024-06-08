import React from "react";
import { render } from "@testing-library/react";
import CommunityAppearancePopup from "../CommunityAppearancePopup";

jest.mock("../../Utils/getCookies", () =>
  jest.fn().mockReturnValue({
    access_token: "fake_token",
    username: "test_user",
  }),
);

describe("CommunityAppearancePopup component", () => {
  test("renders the component with initial state", () => {
    const communityName = "exampleCommunity";
    const communityData = {
      communityType: "public",
      description: "description of a community",
    };
    const avatar = "@/app/assets/awwpfp.jpg";
    const communityBanner = "@/app/assets/awwpfp.jpg";

    const { getByText } = render(
      <CommunityAppearancePopup
        onClose={console.log("close")}
        communityName={communityName}
        communityData={communityData}
        avatar={avatar}
        communityBanner={communityBanner}
      />,
    );

    expect(getByText("Avatar")).toBeInTheDocument();
    expect(getByText("Banner")).toBeInTheDocument();
  });
});
