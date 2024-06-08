import submitToApi from "../submitToApi";

describe("submitToApi", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should make a POST request with correct data", async () => {
    const mockResponse = { message: "Success!" };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const url = "https://example.com/api";
    const method = "POST";
    const data = { key: "value" };

    const response = await submitToApi(url, method, data);

    expect(fetch).toHaveBeenCalledWith(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    expect(response).toEqual(mockResponse);
  });

  it("should make a GET request without data", async () => {
    const mockResponse = { message: "Success!" };
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const url = "https://example.com/api";
    const method = "GET";

    const response = await submitToApi(url, method);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(response).toEqual(mockResponse);
  });

  it("should handle API error", async () => {
    const errorMessage = "API error";
    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

    const url = "https://example.com/api";
    const method = "GET";

    await expect(submitToApi(url, method)).rejects.toThrowError(errorMessage);
  });
});
