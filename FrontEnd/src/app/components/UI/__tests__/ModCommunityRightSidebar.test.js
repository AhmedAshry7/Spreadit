import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModCommunityRightSidebar from "../ModCommunityRightSidebar";

describe("ModCommunityRightSidebar Component", () => {
  test("renders correctly", () => {
    const communityName = "aww";
    const communityDescription = "cute animals";
    const communityMembersNum = 11;
    const textWidget = "widget";
    const widgetDescription = "widget desc";

    render(
      <ModCommunityRightSidebar
        communityName={communityName}
        communityDescription={communityDescription}
        communityMembersNum={communityMembersNum}
        textWidget={textWidget}
        widgetDescription={widgetDescription}
      />,
    );
  });
});
