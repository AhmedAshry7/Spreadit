import handler from "../apiHandler";

describe("API Handler", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should make a GET request with provided URL and return data", async () => {
    const url = "/example";
    const method = "GET";
    const responseData = { key: "value" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(responseData),
    });

    const result = await handler(url, method);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3002${url}`,
      expect.objectContaining({
        method: "GET",
      }),
    );
    expect(result).toEqual(responseData);
  });

  it("should make a POST request with provided URL and body", async () => {
    const url = "/example";
    const method = "POST";
    const body = { data: "example" };

    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await handler(url, method, body);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3002${url}`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
      }),
    );
  });

  it("should throw an error if the response is not OK", async () => {
    const url = "/example";
    const method = "GET";

    fetch.mockResolvedValueOnce({ ok: false });

    await expect(handler(url, method)).rejects.toThrow("API request failed");
  });

  it("should handle errors thrown during fetch", async () => {
    const url = "/example";
    const method = "GET";

    fetch.mockRejectedValueOnce(new Error("Fetch error"));

    await expect(handler(url, method)).rejects.toThrow("Fetch error");
  });
});
