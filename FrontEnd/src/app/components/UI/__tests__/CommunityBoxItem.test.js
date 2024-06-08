import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommunityBoxItem from "../CommunityBoxItem";

describe("CommunityBoxItem Component", () => {
  const props = {
    count: 1,
    name: "aww",
    category: "Cute pets",
    members: "20M",
    icon: <img src="@/app/assets/awwpfp.jpg" alt="Subspreaditreddit Icon" />,
    iconurl: "@/app/assets/awwpfp.jpg",
    description: "A community for posting cute and adorable pets",
    key: 1,
  };

  test("renders correctly", async () => {
    render(
      <CommunityBoxItem
        count={props.count}
        name={props.name}
        category={props.category}
        members={props.members}
        icon={props.icon}
        iconurl={props.iconurl}
        description={props.description}
        key={props.key}
      />,
    );

    //check if the component renders correctly
    const listItem = screen.getByRole("listitem");
    expect(listItem).toBeInTheDocument();

    //check if the count is rendered correctly
    const countElement = screen.getByText("1");
    expect(countElement).toBeInTheDocument();

    //check if the name, category, and members are rendered correctly
    const nameElement = screen.getByText("aww");
    expect(nameElement).toBeInTheDocument();

    const categoryElement = screen.getByText("Cute pets");
    expect(categoryElement).toBeInTheDocument();

    const membersElement = screen.getByText("20M");
    expect(membersElement).toBeInTheDocument();

    //check if the icon is rendered correctly
    const iconElement = screen.getByAltText("Subspreaditreddit Icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement.src).toContain("awwpfp.jpg");
  });
});
