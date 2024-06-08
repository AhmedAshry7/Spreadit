import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RemovalReasonItem from "@/app/community/[communityName]/moderation/rulesandremoval/RemovalReasonItem";

describe("RemovalReasonItem component", () => {
  test("renders the component correctly", () => {
    const props = {
      title: "Spam",
      message:
        "Your post has been removed because it violates our community guidelines",
      key: 1,
      count: 1,
      communityName: "Community",
      id: 2,
    };

    const { getByText } = render(
      <RemovalReasonItem
        title={props.title}
        message={props.message}
        key={props.key}
        count={props.count}
        communityName={props.communityName}
        id={props.id}
      />,
    );

    expect(getByText("Spam")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
  });
});
