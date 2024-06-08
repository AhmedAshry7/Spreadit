import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Feed from "../page";
import Toogle from "@/app/components/UI/Switch";
import OutlineButton from "@/app/components/UI/OutlineButton";

describe("Feed component", () => {
  it("renders loading indicator initially", async () => {
    render(<Feed />);

    const loadingElement = screen.getByText("Loading", { exact: false });

    expect(loadingElement).toBeInTheDocument();
  });
});
