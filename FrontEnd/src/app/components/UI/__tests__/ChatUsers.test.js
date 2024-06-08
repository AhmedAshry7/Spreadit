import React from "react";
import { render } from "@testing-library/react";
import ChatUsers from "../ChatUsers";

describe("The ChatUsers component tests", () => {
  const selectedChatroom = {
    id: "aH0j4ZX260DIECF2apgc",
    groupname: "",
    myData: {
      id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
      avatarUrl:
        "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
      email: "hedeya@gmail.com",
      name: "abdullah12",
    },
    usersData: {
      userId1: {
        name: "User 1",
        avatarUrl:
          "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
      },
      userId2: {
        name: "User 2",
        avatarUrl:
          "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
      },
    },
    lastMessage: "Hello there!",
  };

  const userData = {
    id: "uN0bhpTVzDe5I7OlBmJxB9T1e6w2",
    avatarUrl:
      "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
    email: "hedeya@gmail.com",
    name: "abdullah12",
  };

  test("renders loading state correctly", () => {
    const { getByText } = render(
      <ChatUsers selectedChatroom={selectedChatroom} userData={userData} />,
    );
    expect(getByText("...loading")).toBeInTheDocument();
  });
});
