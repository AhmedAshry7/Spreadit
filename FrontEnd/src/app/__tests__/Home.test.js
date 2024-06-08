import { render, screen } from "@testing-library/react";
import Home from "../page";

it("should render the heading test", () => {
  render(<Home />); //ARRANGE

  const myElem = screen.getByText("Hello World"); //ACT

  expect(myElem).toBeInTheDocument(); //ASSERT
});
