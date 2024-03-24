module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Mock CSS modules
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Mock image files
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    // Transform ts and tsx files with ts-jest
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // Setup files that will be run before each test file
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
