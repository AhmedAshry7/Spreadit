// NotificationsModal.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationsModal from "../NotificationsModal";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({}),
}));

jest.mock("../../utils/getCookies", () =>
  jest.fn().mockReturnValue({
    access_token: "fake_token",
    username: "test_user",
  }),
);

jest.mock("../../utils/apiHandler", () => ({
  __esModule: true,
  default: jest.fn((endPoint, Method, Body, token) => {
    if (endPoint === `/message/unreadcount/`) {
      return Promise.resolve({ unreadMessageCount: 5 });
    } else if (endPoint === `/community/suggest`) {
      return Promise.resolve({ communityname: "SUB_A" });
    } else if (endPoint === `/notifications`) {
      return Promise.resolve([]);
    }
    // Handle other cases if needed
  }),
}));

describe("Notifications Modal", () => {
  it("Renders NotificationsModal with initial state and fetches data", async () => {
    render(<NotificationsModal />);

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();

    expect(screen.queryByTestId("tail-spin-loading")).toBeInTheDocument();

    // Simulate data fetching completion (replace with your actual data fetching logic)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.queryByTestId("tail-spin-loading")).not.toBeInTheDocument();
    // Add assertions for fetched data (notification content, etc.) based on your Notification component
  });

  it("Renders NotificationsModal with and when thre is no notifications it suggest a community", async () => {
    render(<NotificationsModal />);

    // Simulate data fetching completion (replace with your actual data fetching logic)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.getByText("r/SUB_A")).toBeInTheDocument();
  });

  it("Renders NotificationsModal and displays the number of unread messages", async () => {
    render(<NotificationsModal />);

    // Simulate data fetching completion (replace with your actual data fetching logic)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
