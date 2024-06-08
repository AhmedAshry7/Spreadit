import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import RulesItem from "@/app/community/[communityName]/moderation/rulesandremoval/RulesItem";

describe("RulesItem component", () => {
  test("renders the component correctly", () => {
    const props = {
      title: "Nospamming",
      description: "Spamming is not allowed in this community",
      appliesto: "Posts & comments",
      report: "This rule is broken when users post repetitive content",
      key: 1,
      count: 1,
      communityName: "Community",
    };

    const { getByText } = render(<RulesItem {...props} />);

    expect(getByText("Nospamming")).toBeInTheDocument();
  });
});
