import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Listbutton from "../Listbutton";
import { expect } from "@jest/globals";

describe("The List button tests", () => {
  const mockChoose = jest.fn();

  beforeEach(() => {
    render(
      <Listbutton
        list={["MAN", "WOMAN"]}
        type="gender"
        initialv="MAN"
        description="select the gender"
        displayedColor={"blue"}
        choose={mockChoose}
      />,
    );
  });

  test("checking it renders correctly", () => {
    expect(screen.getByText("MAN")).toBeInTheDocument();
    expect(screen.getByText("select the gender")).toBeInTheDocument();
    expect(screen.getByText("gender")).toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that the list turns on and off when it is clicked", () => {
    const listbutton = screen.getByText("MAN");
    fireEvent.click(listbutton);
    expect(screen.getByText("WOMAN")).toBeInTheDocument();
    fireEvent.click(listbutton);
    expect(screen.queryByText("WOMAN")).not.toBeInTheDocument();
    //expect(false).toBe(true);
  });

  test("checking that calls the function when an item is clicked", () => {
    const listbutton = screen.getByText("MAN");
    fireEvent.click(listbutton);
    fireEvent.click(screen.getByText("WOMAN"));
    expect(mockChoose).toBeCalledWith("WOMAN");
    //expect(false).toBe(true);
  });
});
