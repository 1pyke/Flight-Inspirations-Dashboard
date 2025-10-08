import { setCachedData, getCachedData } from "./cacheUtils";

describe("cache utilities", () => {
  it("sets and gets cache values", () => {
    setCachedData("testKey", undefined, "testValue");
    expect(getCachedData("testKey", 10000)).toBe("testValue");
  });
});
