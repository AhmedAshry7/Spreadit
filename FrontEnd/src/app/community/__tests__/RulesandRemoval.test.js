import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import RulesandRemoval from "@/app/community/[communityName]/moderation/rulesandremoval/RulesandRemoval";
import { handler } from "@/app/utils/apiHandler";

describe("RulesandRemoval", () => {
  afterEach(() => {
    if (global.fetch) {
      global.fetch.mockRestore();
    }
  });

  jest.mock("@/app/utils/apiHandler");

  jest.mock("../../utils/getCookies", () => ({
    __esModule: true,
    default: async () => ({
      username: "testuser",
      access_token: "testtoken",
    }),
  }));

  jest.mock("../../utils/apiHandler");

  it("renders the component with rules", async () => {
    const communityName = "Community";

    const mockRules = [
      {
        title: "Rule1",
        description: "Description1",
        appliesTo: "both",
        reportReason: "Reason1",
      },
      {
        title: "Rule2",
        description: "Description2",
        appliesTo: "posts",
        reportReason: "Reason2",
      },
    ];
    const { getByText } = render(
      <RulesandRemoval communityName={communityName} />,
    );

    await waitFor(() => {
      expect(getByText("Rule1")).toBeInTheDocument();
      expect(getByText("Description1")).toBeInTheDocument();
      expect(getByText("Reason1")).toBeInTheDocument();
      expect(getByText("Rule2")).toBeInTheDocument();
      expect(getByText("Description2")).toBeInTheDocument();
      expect(getByText("Reason2")).toBeInTheDocument();
    });
    global.fetch.mockRestore();
  });
});
