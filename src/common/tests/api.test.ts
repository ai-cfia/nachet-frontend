import { describe, it } from "vitest";
import { readAzureStorageDir } from "../api";

describe("readAzureStorageDir", () => {
  it("should return data", async () => {
    const backendUrl = "backendUrl";
    const uuid = "uuid";

    expect(readAzureStorageDir(backendUrl, uuid)).rejects.toThrow();
  });
});
