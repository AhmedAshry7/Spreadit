import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ScheduledMenu from "../ScheduledMenu";

describe("ScheduledMenu component", () => {
  it("should render correctly", () => {
    const onCloseMock = jest.fn();
    const changeTimeMock = jest.fn();
    const { getByText } = render(
      <ScheduledMenu onClose={onCloseMock} changeTime={changeTimeMock} />,
    );
    expect(getByText("Schedule this post")).toBeInTheDocument();
  });

  it("should close the menu when 'X' button is clicked", () => {
    const onCloseMock = jest.fn();
    const changeTimeMock = jest.fn();
    const { getByTestId } = render(
      <ScheduledMenu onClose={onCloseMock} changeTime={changeTimeMock} />,
    );
    const closeButton = getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call changeTime with the formatted date when 'Save' button is clicked", () => {
    const onCloseMock = jest.fn();
    const changeTimeMock = jest.fn();
    const { getByText, getByTestId } = render(
      <ScheduledMenu onClose={onCloseMock} changeTime={changeTimeMock} />,
    );
    const datePicker = getByTestId("calendar");
    fireEvent.change(datePicker, { target: { value: "2024-05-01 12:00" } });
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
    expect(changeTimeMock).toHaveBeenCalledWith("2024-05-01T12:00:00.000Z");
  });
});
