import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "../[communityName]/moderation/(UserManagement)/SearchBar";

describe("Search Bar", () => {
  const setKeyword = jest.fn();
  const setIsSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the SearchBar when isSearch=false correctly", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar
        isSearch={false}
        setKeyword={setKeyword}
        setIsSearch={setIsSearch}
        isEmpty={false}
      />,
    );
    expect(getByPlaceholderText("Search users")).toBeInTheDocument();
    expect(getByTestId("searchbtn")).toBeInTheDocument();
  });

  test("renders the SearchBar when isSearch=true correctly", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <SearchBar
        isSearch={true}
        setKeyword={setKeyword}
        setIsSearch={setIsSearch}
        isEmpty={false}
      />,
    );
    expect(getByPlaceholderText("Search users")).toBeInTheDocument();
    expect(getByTestId("searchbtn")).toBeInTheDocument();
    expect(getByText("See all")).toBeInTheDocument();
  });

  test("renders the SearchBar when isEmpty=true correctly", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <SearchBar
        isSearch={true}
        setKeyword={setKeyword}
        setIsSearch={setIsSearch}
        isEmpty={true}
      />,
    );
    expect(getByText("No results for")).toBeInTheDocument();
  });

  test("updates the keyword", () => {
    render(
      <SearchBar
        isSearch={true}
        setKeyword={setKeyword}
        setIsSearch={setIsSearch}
        isEmpty={false}
      />,
    );
    fireEvent.change(screen.getByPlaceholderText("Search users"), {
      target: { value: "test" },
    });
    expect(screen.getByPlaceholderText("Search users").value).toBe("test");
  });

  test("send keyword", () => {
    render(
      <SearchBar
        isSearch={true}
        setKeyword={setKeyword}
        setIsSearch={setIsSearch}
        isEmpty={true}
      />,
    );
    fireEvent.click(screen.getByTestId("searchbtn"));
    expect(setKeyword).toHaveBeenCalledTimes(1);
    expect(setIsSearch).toHaveBeenCalledTimes(1);
  });

  test("click see all", () => {
    render(
      <SearchBar
        isSearch={true}
        setKeyword={setKeyword}
        setIsSearch={setIsSearch}
        isEmpty={true}
      />,
    );
    fireEvent.click(screen.getAllByText("See all")[0]);
    expect(setKeyword).toHaveBeenCalledTimes(1);
    expect(setIsSearch).toHaveBeenCalledTimes(1);
  });
});
