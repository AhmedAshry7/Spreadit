import React from "react";
import { render } from "@testing-library/react";
import PeopleItem from "../PeopleItem";

describe("PeopleItem component", () => {
  test("renders the component with initial state", () => {
    const { getByText, getByAltText } = render(
      <PeopleItem
        name="User"
        members={100}
        url="/user/profile.jpg"
        description="This is a description of the person"
        key="1"
      />,
    );

    expect(getByText("u/User")).toBeInTheDocument();
  });
});
