import React from "react";
import { getByRole, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Validation from "../Validation";
import "@testing-library/jest-dom";

describe("Validation component", () => {
  it("inputs empty values", () => {
    const values = {
      username: "",
      email: "",
      password: "",
      usernameTaken: false,
      usernameExists: false,
      incorrectPassword: false,
    };
    const errors = Validation(values);
    expect(errors.username).toBe("Username is Required.");
    expect(errors.email).toBe("Email is Required.");
    expect(errors.password).toBe("Password is Required.");
  });

  it("inputs correct values", () => {
    const values = {
      username: "testuser",
      email: "test@gmail.com",
      password: "12345678",
      usernameTaken: false,
      usernameExists: false,
      incorrectPassword: false,
    };
    const errors = Validation(values);
    expect(errors.username).toBe("");
    expect(errors.email).toBe("");
    expect(errors.password).toBe("");
  });

  it("inputs invalid email", () => {
    const values = {
      username: "",
      email: "test",
      password: "",
      usernameTaken: false,
      usernameExists: false,
      incorrectPassword: false,
    };
    const errors = Validation(values);
    expect(errors.email).toBe("Invalid email address.");
  });

  it("inputs existing username", () => {
    const values = {
      username: "testusername",
      email: "testest",
      password: "",
      usernameTaken: true,
      usernameExists: false,
      incorrectPassword: false,
    };
    const errors = Validation(values);
    expect(errors.username).toBe("This username is already taken.");
  });

  it("inputs non existing username", () => {
    const values = {
      username: "testusername",
      email: "testest",
      password: "",
      usernameTaken: false,
      usernameExists: true,
      incorrectPassword: false,
    };
    const errors = Validation(values);
    expect(errors.username).toBe("This username does not exist.");
  });

  it("inputs invalid password ", () => {
    const values = {
      username: "",
      email: "",
      password: "123",
      usernameTaken: false,
      usernameExists: false,
      incorrectPassword: false,
    };
    const errors = Validation(values);
    expect(errors.password).toBe("Password must be more than 8 charcters.");
  });

  it("inputs incorrect password ", () => {
    const values = {
      username: "",
      email: "",
      password: "12345678",
      usernameTaken: false,
      usernameExists: false,
      incorrectPassword: true,
    };
    const errors = Validation(values);
    expect(errors.password).toBe("Password is incorrect.");
  });
});
