// import React from "react";
// import { render } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'
// import RecoverUsername from "../RecoverUsername";
// import '@testing-library/jest-dom'

// describe("RecoverUsername component", () => {
//     it("renders the form correctly", () => {
//         const { getByText } = render(<RecoverUsername />);
//         expect(getByText("Recover Username")).toBeInTheDocument();
//         expect(getByText("Enter your email address to recover your username")).toBeInTheDocument();
//     });

//     it("renders the email input correctly", () => {
//         const { getByPlaceholderText } = render(<RecoverUsername />);
//         expect(getByPlaceholderText("Email")).toBeInTheDocument();
//     });

//     it("renders the submit button correctly", () => {
//         const { getByRole } = render(<RecoverUsername />);
//         expect(getByRole("submit", { name: "Recover Username" })).toBeInTheDocument();
//     });

//     it("renders the cancel button correctly", () => {
//         const { getByRole } = render(<RecoverUsername />);
//         expect(getByRole("button", { name: "Cancel" })).toBeInTheDocument();
//     });

//     it("calls the submit function when clicked", () => {
//         const handleSubmit = jest.fn();
//         const { getByRole } = render(<RecoverUsername onSubmit={handleSubmit} />);
//         userEvent.click(getByRole("button", { name: "Recover Username" }));
//         expect(handleSubmit).toHaveBeenCalledTimes(1);
//     });

//     it("calls the cancel function when clicked", () => {
//         const handleCancel = jest.fn();
//         const { getByRole } = render(<RecoverUsername onCancel={handleCancel} />);
//         userEvent.click(getByRole("button", { name: "Cancel" }));
//         expect(handleCancel).toHaveBeenCalledTimes(1);
//     });

// });
