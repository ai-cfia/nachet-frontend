import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Body from "./body";
import axios from "axios";

process.env.VITE_BACKEND_URL = "somebackendurl";

const mockProps = {
  windowSize: {
    width: 1000,
    height: 1000,
  },
  uuid: "1234",
  creativeCommonsPopupOpen: false,
  setCreativeCommonsPopupOpen: vi.fn(),
  handleCreativeCommonsAgreement: vi.fn(),
  setSignUpOpen: vi.fn(),
  signUpOpen: false,
};

const mockAddEventListener = vi.fn();
const mockGetUserMedia = vi.fn(async () => {
  return new Promise<void>((resolve) => {
    resolve();
  });
});

Object.defineProperty(global.navigator, "mediaDevices", {
  value: {
    addEventListener: mockAddEventListener,
    removeEventListener: vi.fn(),
    getUserMedia: mockGetUserMedia,
  },
});

Object.defineProperty(global.window, "alert", {
  value: vi.fn(),
});

vi.mock("../../common", async (importOriginal) => {
  const mod = await importOriginal<typeof import("../../common")>();
  return {
    ...mod,
    readAzureStorageDir: vi.fn(async () => {
      return new Promise<any>((resolve) => {
        resolve(true);
      });
    }),
    createAzureStorageDir: vi.fn(),
    deleteAzureStorageDir: vi.fn(),
    inferenceRequest: vi.fn(),
    requestModelMetadata: vi.fn(),
  };
});

vi.mock("axios");
vi.mocked(axios).mockResolvedValue({
  ok: true,
  status: 200,
  data: {
    testDir1: "testDir1",
    testDir2: "testDir2",
    testDir3: "testDir3",
  },
});

describe("Body", () => {
  it("renders Body component", async () => {
    render(<Body {...mockProps} />);
    const bodyElement = await screen.findByTestId("body-component");
    expect(bodyElement).toBeTruthy();
  });

  it("renders Microscope Feed", async () => {
    render(<Body {...mockProps} />);
    const classifierElement = await screen.findByTestId("microscope-component");
    expect(classifierElement).toBeTruthy();
  });

  it("renders Storage Directory", async () => {
    render(<Body {...mockProps} />);
    const storageElement = await screen.findByTestId(
      "storage-directory-component",
    );
    expect(storageElement).toBeTruthy();
  });

  it("renders Image Cache", async () => {
    render(<Body {...mockProps} />);
    const imageCacheElement = await screen.findByTestId(
      "image-cache-component",
    );
    expect(imageCacheElement).toBeTruthy();
  });

  it("renders Classification Results", async () => {
    render(<Body {...mockProps} />);
    const classificationResultsElement = await screen.findByTestId(
      "classification-results-component",
    );
    expect(classificationResultsElement).toBeTruthy();
  });

  // TODO: test the popups
});
